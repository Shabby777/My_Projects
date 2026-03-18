from __future__ import annotations

import time
from collections import deque
from typing import Deque, Tuple

import cv2
import pyautogui

from gesture_mouse.config import AppConfig
from gesture_mouse.controller import MouseController
from gesture_mouse.gestures import Gesture, GestureRecognizer
from gesture_mouse.vision import HandTracker


def clamp(value: float, minimum: float, maximum: float) -> float:
    return max(minimum, min(value, maximum))


def map_to_screen_space(index_point, frame_shape, margin: int) -> Tuple[float, float]:
    frame_height, frame_width = frame_shape[:2]
    x_px = index_point.x * frame_width
    y_px = index_point.y * frame_height

    usable_width = max(1, frame_width - (2 * margin))
    usable_height = max(1, frame_height - (2 * margin))

    normalized_x = clamp((x_px - margin) / usable_width, 0.0, 1.0)
    normalized_y = clamp((y_px - margin) / usable_height, 0.0, 1.0)

    return normalized_x, normalized_y


def determine_scroll_amount(landmarks, step: int) -> int:
    index_tip = landmarks[8]
    middle_tip = landmarks[12]
    average_y = (index_tip.y + middle_tip.y) / 2
    return step if average_y < 0.45 else -step


def draw_status(frame, fps: float, gesture_name: str, action_text: str, cursor_position) -> None:
    lines = [
        f"FPS: {fps:.1f}",
        f"Gesture: {gesture_name}",
        f"Action: {action_text}",
        "Controls: Open palm = move | Fist = click | Two fingers = scroll",
        "Press q to quit.",
    ]

    if cursor_position[0] is not None and cursor_position[1] is not None:
        lines.append(f"Cursor: {cursor_position[0]}, {cursor_position[1]}")

    for idx, text in enumerate(lines):
        cv2.putText(
            frame,
            text,
            (20, 30 + (idx * 30)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.75,
            (255, 255, 255),
            2,
        )


def main() -> None:
    config = AppConfig()
    tracker = HandTracker(config)
    recognizer = GestureRecognizer()
    mouse = MouseController(pyautogui.size(), config)

    cap = cv2.VideoCapture(config.camera_index)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, config.frame_width)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, config.frame_height)

    if not cap.isOpened():
        raise RuntimeError("Unable to open webcam. Check camera permissions and index.")

    frame_times: Deque[float] = deque(maxlen=30)
    gesture_history: Deque[Gesture] = deque(maxlen=config.gesture_hold_frames)

    try:
        while True:
            frame_start = time.time()
            success, frame = cap.read()
            if not success:
                break

            frame = cv2.flip(frame, 1)
            results = tracker.process(frame)
            detection = tracker.get_primary_hand(results)

            cursor_position = (None, None)
            action_text = "Idle"
            gesture_name = Gesture.NONE.value

            if detection and results.multi_hand_landmarks:
                tracker.draw(frame, results.multi_hand_landmarks[0])
                gesture_result = recognizer.detect(detection.landmarks, detection.handedness_label)
                gesture_history.append(gesture_result.gesture)

                stable_gesture = (
                    gesture_history[-1]
                    if len(gesture_history) >= config.gesture_hold_frames
                    and len(set(gesture_history)) == 1
                    else Gesture.NONE
                )

                index_tip = detection.landmarks[8]
                normalized_point = map_to_screen_space(index_tip, frame.shape, config.cursor_margin)
                scroll_amount = determine_scroll_amount(detection.landmarks, config.scroll_step)
                x, y, action_text = mouse.handle_gesture(
                    stable_gesture,
                    normalized_point,
                    scroll_amount,
                )
                cursor_position = (x, y)
                gesture_name = stable_gesture.value
            else:
                gesture_history.clear()
                mouse.smoother.reset()

            frame_times.append(time.time() - frame_start)
            avg_frame_time = sum(frame_times) / len(frame_times)
            fps = 1.0 / avg_frame_time if avg_frame_time > 0 else 0.0

            if fps < config.target_fps:
                action_text = f"{action_text} | Low FPS warning"

            draw_status(frame, fps, gesture_name, action_text, cursor_position)
            cv2.rectangle(
                frame,
                (config.cursor_margin, config.cursor_margin),
                (frame.shape[1] - config.cursor_margin, frame.shape[0] - config.cursor_margin),
                (0, 255, 255),
                2,
            )
            cv2.imshow("Hand Gesture Mouse Controller", frame)

            if cv2.waitKey(1) & 0xFF == ord("q"):
                break
    finally:
        cap.release()
        tracker.close()
        cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
