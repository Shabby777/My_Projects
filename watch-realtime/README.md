# Watch Real-Time App

A watch-inspired web app that displays both an analog dial and digital time for selected world timezones.

## Run
Open `index.html` in a browser.

## Features
- Rolex-style analog watch UI with animated hour/minute/second hands
- Fetches real-time data from `https://timeapi.io`
- Uses `https://worldtimeapi.org` as API fallback
- Falls back to device time if both APIs are unavailable
- Prevents stale API responses from overwriting newer timezone selections
- Timezone switcher
- Live clock updates every second after sync
