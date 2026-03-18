from __future__ import annotations

import time
from dataclasses import dataclass, field
from typing import Tuple

import pyautogui

from gesture_mouse.config import AppConfig
from gesture_mouse.gestures import Gesture
from gesture_mouse.smoothing import ExponentialSmoother

pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0


@dataclass
class MouseController:
    screen_size: Tuple[int, int]
    config: AppConfig
    smoother: ExponentialSmoother = field(init=False)
    last_click_time: float = field(default=0.0, init=False)
    last_scroll_time: float = field(default=0.0, init=False)

    def __post_init__(self) -> None:
        self.smoother = ExponentialSmoother(alpha=self.config.smoothing_factor)

    def move(self, normalized_point: Tuple[float, float]) -> Tuple[int, int]:
        screen_x = normalized_point[0] * self.screen_size[0]
        screen_y = normalized_point[1] * self.screen_size[1]
        x, y = self.smoother.update((screen_x, screen_y))
        pyautogui.moveTo(x, y)
        return x, y

    def click(self) -> bool:
        now = time.time()
        if now - self.last_click_time >= self.config.click_cooldown:
            pyautogui.click()
            self.last_click_time = now
            return True
        return False

    def scroll(self, amount: int) -> bool:
        now = time.time()
        if now - self.last_scroll_time >= self.config.scroll_cooldown:
            pyautogui.scroll(amount)
            self.last_scroll_time = now
            return True
        return False

    def handle_gesture(
        self,
        gesture: Gesture,
        normalized_point: Tuple[float, float],
        scroll_amount: int,
    ) -> Tuple[int | None, int | None, str]:
        if gesture == Gesture.MOVE:
            x, y = self.move(normalized_point)
            return x, y, "Moving cursor"
        if gesture == Gesture.CLICK:
            clicked = self.click()
            return None, None, "Click" if clicked else "Fist detected"
        if gesture == Gesture.SCROLL:
            did_scroll = self.scroll(scroll_amount)
            direction = "up" if scroll_amount > 0 else "down"
            return None, None, f"Scroll {direction}" if did_scroll else "Two fingers detected"

        return None, None, "Idle"
