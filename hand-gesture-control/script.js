const startButton = document.getElementById('startButton');
const video = document.getElementById('video');
const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');
const virtualCursor = document.getElementById('virtualCursor');
const gestureLabel = document.getElementById('gestureLabel');
const cursorLabel = document.getElementById('cursorLabel');
const actionLabel = document.getElementById('actionLabel');
const cameraStatus = document.getElementById('cameraStatus');
const interactiveSurface = document.getElementById('interactiveSurface');
const demoTargets = [...document.querySelectorAll('.demo-target')];

let hands;
let camera;
let cameraStarted = false;
let pinchActive = false;
let cursor = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
let smoothedCursor = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
let lastHoverTarget = null;
let clickFlashTimeout;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, factor) => start + (end - start) * factor;

function resizeCanvas() {
  const { clientWidth, clientHeight } = interactiveSurface;
  canvas.width = clientWidth;
  canvas.height = clientHeight;
}

function updateCursor(position) {
  cursor.x = clamp(position.x, 16, window.innerWidth - 16);
  cursor.y = clamp(position.y, 16, window.innerHeight - 16);

  smoothedCursor.x = lerp(smoothedCursor.x, cursor.x, 0.22);
  smoothedCursor.y = lerp(smoothedCursor.y, cursor.y, 0.22);

  virtualCursor.style.left = `${smoothedCursor.x}px`;
  virtualCursor.style.top = `${smoothedCursor.y}px`;
  cursorLabel.textContent = `${Math.round(smoothedCursor.x)}, ${Math.round(smoothedCursor.y)}`;

  highlightHoveredTarget();
}

function highlightHoveredTarget() {
  const hovered = document.elementFromPoint(smoothedCursor.x, smoothedCursor.y);
  const nextTarget = hovered?.closest('.demo-target') || null;

  if (lastHoverTarget && lastHoverTarget !== nextTarget) {
    lastHoverTarget.classList.remove('active-target');
  }

  if (nextTarget) {
    nextTarget.classList.add('active-target');
  }

  lastHoverTarget = nextTarget;
}

function dispatchVirtualClick() {
  const target = document.elementFromPoint(smoothedCursor.x, smoothedCursor.y)?.closest('button, [role="button"], a');
  if (!target) {
    actionLabel.textContent = 'Pinch detected, but no target was under the cursor.';
    return;
  }

  target.click();
  virtualCursor.classList.add('clicking');
  clearTimeout(clickFlashTimeout);
  clickFlashTimeout = setTimeout(() => {
    virtualCursor.classList.remove('clicking');
  }, 180);
}

function isOpenHand(landmarks, handedness) {
  const fingerPairs = [
    [8, 6],
    [12, 10],
    [16, 14],
    [20, 18]
  ];

  const extendedFingers = fingerPairs.filter(([tip, pip]) => landmarks[tip].y < landmarks[pip].y).length;
  const thumbExtended =
    handedness === 'Right'
      ? landmarks[4].x < landmarks[3].x
      : landmarks[4].x > landmarks[3].x;

  return extendedFingers >= 3 && thumbExtended;
}

function getPinchDistance(landmarks) {
  const dx = landmarks[8].x - landmarks[4].x;
  const dy = landmarks[8].y - landmarks[4].y;
  return Math.hypot(dx, dy);
}

function updateGestureState(landmarks, handedness) {
  const pinchDistance = getPinchDistance(landmarks);
  const openHand = isOpenHand(landmarks, handedness);
  const pinching = pinchDistance < 0.055;
  const pointer = landmarks[9];

  if (openHand || pinching) {
    updateCursor({
      x: (1 - pointer.x) * window.innerWidth,
      y: pointer.y * window.innerHeight
    });
  }

  if (pinching && !pinchActive) {
    gestureLabel.textContent = 'Pinch → click';
    dispatchVirtualClick();
  } else if (openHand) {
    gestureLabel.textContent = 'Open hand → move cursor';
  } else if (!pinching) {
    gestureLabel.textContent = 'Show an open hand';
  }

  pinchActive = pinching;
}

function drawResults(results) {
  resizeCanvas();
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!results.multiHandLandmarks?.length) {
    ctx.restore();
    if (!cameraStarted) {
      gestureLabel.textContent = 'Waiting for camera';
    } else {
      gestureLabel.textContent = 'No hand detected';
    }
    pinchActive = false;
    return;
  }

  for (let index = 0; index < results.multiHandLandmarks.length; index += 1) {
    const landmarks = results.multiHandLandmarks[index];
    const handedness = results.multiHandedness?.[index]?.label || 'Right';

    drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
      color: '#60a5fa',
      lineWidth: 4
    });
    drawLandmarks(ctx, landmarks, {
      color: '#f8fafc',
      fillColor: '#8b5cf6',
      lineWidth: 2,
      radius: 5
    });

    updateGestureState(landmarks, handedness);
    break;
  }

  ctx.restore();
}

async function setupHands() {
  hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.6
  });

  hands.onResults(drawResults);
}

async function startCamera() {
  if (!hands) {
    await setupHands();
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      },
      audio: false
    });

    video.srcObject = stream;
    await video.play();
    resizeCanvas();

    camera = new Camera(video, {
      onFrame: async () => {
        await hands.send({ image: video });
      },
      width: 1280,
      height: 720
    });

    await camera.start();
    cameraStarted = true;
    cameraStatus.textContent = 'Camera live';
    cameraStatus.classList.remove('idle');
    cameraStatus.classList.add('active');
    gestureLabel.textContent = 'Show an open hand';
    startButton.textContent = 'Camera enabled';
    startButton.disabled = true;
  } catch (error) {
    console.error(error);
    cameraStatus.textContent = 'Camera blocked';
    gestureLabel.textContent = 'Unable to access webcam';
    actionLabel.textContent = 'Webcam permission is required to run gesture tracking.';
  }
}

startButton.addEventListener('click', startCamera);
window.addEventListener('resize', resizeCanvas);

for (const target of demoTargets) {
  target.addEventListener('click', () => {
    actionLabel.textContent = `${target.dataset.action} triggered at ${new Date().toLocaleTimeString()}`;
  });
}

resizeCanvas();
updateCursor(cursor);
