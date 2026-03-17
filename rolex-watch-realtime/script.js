const timezoneSelect = document.getElementById("timezoneSelect");
const timeDisplay = document.getElementById("timeDisplay");
const dateDisplay = document.getElementById("dateDisplay");
const statusDisplay = document.getElementById("statusDisplay");

let liveDate = null;
let tickInterval = null;

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

const renderClock = () => {
  if (!liveDate) {
    return;
  }

  const timezone = timezoneSelect.value;
  timeDisplay.textContent = formatTime(liveDate, timezone);
  dateDisplay.textContent = formatDate(liveDate, timezone);
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
  const timezone = timezoneSelect.value;
  statusDisplay.textContent = `Fetching live time for ${timezone}...`;

  try {
    liveDate = await fetchFromTimeApi(timezone);
    statusDisplay.textContent = `Live time synced • ${timezone} (timeapi.io)`;
    startTicking();
    return;
  } catch (timeApiError) {
    try {
      liveDate = await fetchFromWorldTimeApi(timezone);
      statusDisplay.textContent =
        "Live time synced • " + `${timezone} (worldtimeapi.org fallback)`;
      startTicking();
      return;
    } catch (worldTimeApiError) {
      liveDate = new Date();
      statusDisplay.textContent =
        "Live API unavailable. Showing device time fallback.";
      startTicking();
    }
  }
};

timezoneSelect.addEventListener("change", fetchRealtime);

fetchRealtime();
