from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Dict, List


class Gesture(Enum):
    NONE = "none"
    MOVE = "open_palm"
    CLICK = "fist"
    SCROLL = "two_fingers"


@dataclass
class GestureResult:
    gesture: Gesture
    finger_states: Dict[str, bool]


FINGER_TIPS = {
    "thumb": 4,
    "index": 8,
    "middle": 12,
    "ring": 16,
    "pinky": 20,
}

FINGER_PIPS = {
    "thumb": 3,
    "index": 6,
    "middle": 10,
    "ring": 14,
    "pinky": 18,
}


class GestureRecognizer:
    def detect(self, landmarks: List, handedness_label: str) -> GestureResult:
        finger_states = self._finger_states(landmarks, handedness_label)
        extended_count = sum(finger_states.values())

        if extended_count >= 4:
            gesture = Gesture.MOVE
        elif extended_count == 0:
            gesture = Gesture.CLICK
        elif (
            finger_states["index"]
            and finger_states["middle"]
            and not finger_states["ring"]
            and not finger_states["pinky"]
        ):
            gesture = Gesture.SCROLL
        else:
            gesture = Gesture.NONE

        return GestureResult(gesture=gesture, finger_states=finger_states)

    def _finger_states(self, landmarks: List, handedness_label: str) -> Dict[str, bool]:
        states: Dict[str, bool] = {}

        for finger, tip_idx in FINGER_TIPS.items():
            pip_idx = FINGER_PIPS[finger]
            if finger == "thumb":
                if handedness_label == "Left":
                    states[finger] = landmarks[tip_idx].x < landmarks[pip_idx].x
                else:
                    states[finger] = landmarks[tip_idx].x > landmarks[pip_idx].x
            else:
                states[finger] = landmarks[tip_idx].y < landmarks[pip_idx].y

        return states
