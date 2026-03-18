from __future__ import annotations

from dataclasses import dataclass
from typing import Optional

import cv2
import mediapipe as mp

from gesture_mouse.config import AppConfig


@dataclass
class HandDetection:
    landmarks: list
    handedness_label: str


class HandTracker:
    def __init__(self, config: AppConfig) -> None:
        self.config = config
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        self.hands = self.mp_hands.Hands(
            model_complexity=0,
            max_num_hands=1,
            min_detection_confidence=config.min_detection_confidence,
            min_tracking_confidence=config.min_tracking_confidence,
        )

    def process(self, frame):
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        rgb_frame.flags.writeable = False
        results = self.hands.process(rgb_frame)
        rgb_frame.flags.writeable = True
        return results

    def get_primary_hand(self, results) -> Optional[HandDetection]:
        if not results.multi_hand_landmarks or not results.multi_handedness:
            return None

        landmarks = results.multi_hand_landmarks[0].landmark
        handedness_label = results.multi_handedness[0].classification[0].label
        return HandDetection(landmarks=landmarks, handedness_label=handedness_label)

    def draw(self, frame, hand_landmarks) -> None:
        self.mp_drawing.draw_landmarks(
            frame,
            hand_landmarks,
            self.mp_hands.HAND_CONNECTIONS,
            self.mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
            self.mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2),
        )

    def close(self) -> None:
        self.hands.close()
