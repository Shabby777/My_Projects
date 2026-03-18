from dataclasses import dataclass


@dataclass(frozen=True)
class AppConfig:
    camera_index: int = 0
    frame_width: int = 1280
    frame_height: int = 720
    min_detection_confidence: float = 0.7
    min_tracking_confidence: float = 0.7
    smoothing_factor: float = 0.35
    cursor_margin: int = 100
    click_cooldown: float = 0.9
    scroll_cooldown: float = 0.08
    scroll_step: int = 90
    gesture_hold_frames: int = 3
    target_fps: int = 15
