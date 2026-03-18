from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Tuple


@dataclass
class ExponentialSmoother:
    alpha: float
    _value: Optional[Tuple[float, float]] = None

    def update(self, target: Tuple[float, float]) -> Tuple[int, int]:
        if self._value is None:
            self._value = target
        else:
            x = (self.alpha * target[0]) + ((1 - self.alpha) * self._value[0])
            y = (self.alpha * target[1]) + ((1 - self.alpha) * self._value[1])
            self._value = (x, y)
        return int(self._value[0]), int(self._value[1])

    def reset(self) -> None:
        self._value = None
