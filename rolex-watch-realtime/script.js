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

const fetchRealtime = async () => {
  const timezone = timezoneSelect.value;
  statusDisplay.textContent = `Fetching live time for ${timezone}...`;

  try {
    const response = await fetch(
      `https://worldtimeapi.org/api/timezone/${timezone}`
    );

    if (!response.ok) {
      throw new Error("Live time service is unavailable");
    }

    const data = await response.json();
    liveDate = new Date(data.datetime);
    statusDisplay.textContent = `Live time synced • ${timezone}`;
    startTicking();
  } catch (error) {
    statusDisplay.textContent = "Could not fetch live time. Try again shortly.";
  }
};

timezoneSelect.addEventListener("change", fetchRealtime);

fetchRealtime();
