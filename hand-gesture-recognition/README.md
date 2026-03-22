# Real-Time Hand Gesture Recognition Mouse Controller

This project uses **MediaPipe** for hand tracking, **OpenCV** for webcam capture, and **PyAutoGUI** for OS-level mouse control.

## Features

- Open palm gesture moves the mouse cursor.
- Fist gesture performs a mouse click.
- Two-finger gesture scrolls up or down.
- Exponential smoothing reduces cursor jitter.
- Gesture hold logic reduces false positives.
- Live FPS overlay helps verify real-time performance.
- Modular Python structure for easier maintenance.

## Project Structure

```text
hand-gesture-recognition/
├── main.py
├── requirements.txt
└── gesture_mouse/
    ├── __init__.py
    ├── config.py
    ├── controller.py
    ├── gestures.py
    ├── smoothing.py
    └── vision.py
```

## Requirements

- Python 3.10+
- A webcam
- Desktop environment with permission to control the mouse

## Setup

1. Create and activate a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

## Run Locally

```bash
python main.py
```

## Gesture Mapping

- **Open palm**: Move cursor using the index fingertip position.
- **Fist**: Single mouse click with cooldown to avoid repeated clicks.
- **Two fingers**: Scroll. If the two raised fingertips are in the upper half of the frame, scroll up; otherwise scroll down.

## Controls

- Press `q` to quit the app.

## Performance Tips

- Use good lighting for reliable hand tracking.
- Keep only one hand in frame for best results.
- Close other CPU-heavy applications if FPS drops.
- If cursor movement feels too slow or too fast, adjust values in `gesture_mouse/config.py`.

## Notes

- MediaPipe and PyAutoGUI behavior can vary slightly by OS.
- The script disables the PyAutoGUI failsafe so the cursor can move freely to screen edges.
