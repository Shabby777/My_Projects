const timezoneSelect = document.getElementById("timezoneSelect");
const timeDisplay = document.getElementById("timeDisplay");
const dateDisplay = document.getElementById("dateDisplay");
const statusDisplay = document.getElementById("statusDisplay");
const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

let liveDate = null;
let tickInterval = null;
let latestRequestId = 0;

const formatTime = (date, timezone) =>
  new Intl.DateTimeFormat([], {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);

const formatDate = (date, timezone) =>
  new Intl.DateTimeFormat([], {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

const getClockParts = (date, timezone) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value || 0
  );
  const second = Number(
    parts.find((part) => part.type === "second")?.value || 0
  );

  return { hour, minute, second };
};

const setAnalogHands = (date, timezone) => {
  const { hour, minute, second } = getClockParts(date, timezone);
  const hourRotation = (hour % 12) * 30 + minute * 0.5 + second / 120;
  const minuteRotation = minute * 6 + second * 0.1;
  const secondRotation = second * 6;

  hourHand.style.transform = `translateX(-50%) rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`;
};

const renderClock = () => {
  if (!liveDate) {
    return;
  }

  const timezone = timezoneSelect.value;
  timeDisplay.textContent = formatTime(liveDate, timezone);
  dateDisplay.textContent = formatDate(liveDate, timezone);
  setAnalogHands(liveDate, timezone);
  liveDate = new Date(liveDate.getTime() + 1000);
};

const startTicking = () => {
  if (tickInterval) {
    clearInterval(tickInterval);
  }

  renderClock();
  tickInterval = setInterval(renderClock, 1000);
};

const fetchFromTimeApi = async (timezone) => {
  const response = await fetch(
    `https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(
      timezone
    )}`
  );

  if (!response.ok) {
    throw new Error("timeapi.io request failed");
  }

  const data = await response.json();
  if (!data.dateTime) {
    throw new Error("timeapi.io response missing dateTime");
  }

  return new Date(data.dateTime);
};

const fetchFromWorldTimeApi = async (timezone) => {
  const response = await fetch(
    `https://worldtimeapi.org/api/timezone/${encodeURIComponent(timezone)}`
  );

  if (!response.ok) {
    throw new Error("worldtimeapi.org request failed");
  }

  const data = await response.json();
  if (!data.datetime) {
    throw new Error("worldtimeapi.org response missing datetime");
  }

  return new Date(data.datetime);
};

const fetchRealtime = async () => {
  latestRequestId += 1;
  const requestId = latestRequestId;
  const timezone = timezoneSelect.value;
  statusDisplay.textContent = `Fetching live time for ${timezone}...`;

  try {
    const syncedDate = await fetchFromTimeApi(timezone);

    if (requestId !== latestRequestId) {
      return;
    }

    liveDate = syncedDate;
    statusDisplay.textContent = `Live time synced • ${timezone} (timeapi.io)`;
    startTicking();
    return;
  } catch (timeApiError) {
    try {
      const syncedDate = await fetchFromWorldTimeApi(timezone);

      if (requestId !== latestRequestId) {
        return;
      }

      liveDate = syncedDate;
      statusDisplay.textContent =
        "Live time synced • " + `${timezone} (worldtimeapi.org fallback)`;
      startTicking();
      return;
    } catch (worldTimeApiError) {
      if (requestId !== latestRequestId) {
        return;
      }

      liveDate = new Date();
      statusDisplay.textContent =
        "Live API unavailable. Showing device time fallback.";
      startTicking();
    }
  }
};

timezoneSelect.addEventListener("change", fetchRealtime);

fetchRealtime();
