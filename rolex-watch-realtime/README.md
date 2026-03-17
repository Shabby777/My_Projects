# Rolex Watch Real-Time App

A small web app that fetches live time data and displays a ticking clock for selected timezones.

## Run
Open `index.html` in a browser.

## Features
- Fetches real-time data from `https://timeapi.io`
- Uses `https://worldtimeapi.org` as API fallback
- Falls back to device time if both APIs are unavailable
- Prevents stale API responses from overwriting newer timezone selections
- Timezone switcher
- Live clock updates every second after sync
