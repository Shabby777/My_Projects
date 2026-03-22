# Movie Booking App Plan

## Summary
Build a React + Vite + TypeScript frontend demo for a cinematic premium movie-booking experience. The app will use static local data, support the full flow from discovery through booking confirmation, and include a saved-tickets view for previously completed bookings.

## Implementation Changes
- Scaffold a Vite React TypeScript app with Tailwind CSS as the styling system.
- Define shared local types/data for `Movie`, `Showtime`, `Theater`, `Seat`, and `Ticket`, with curated mock content stored in-app.
- Build the core user journey:
  - Home/discovery screen with featured movies, now-showing/upcoming sections, and strong poster-led presentation.
  - Movie details screen with synopsis, format/language metadata, theater/showtime picker, and CTA into seat booking.
  - Seat selection screen with seat states, selected-seat summary, ticket count/pricing, and booking progression.
  - Checkout/confirmation flow using mocked payment inputs and a generated booking confirmation state.
  - Saved tickets screen showing completed bookings from local frontend state/storage.
- Add light app state management for selected movie/showtime/seats and completed bookings.
- Persist completed tickets locally so refreshes keep demo bookings available.
- Create a consistent premium visual system in Tailwind:
  - Theater-inspired dark palette, rich gradients, bold typography, poster cards, and intentional motion on page load/transitions.
  - Responsive layouts for mobile and desktop without relying on a component library.

## Public Interfaces / Types
- Introduce shared frontend domain types for movies, venues, showtimes, seat maps, booking payloads, and stored tickets.
- Keep data access behind a small local service/helper layer so static mock data can later be replaced without rewriting UI screens.
- Use route-level pages for the major views: discovery, movie details, booking, confirmation, and saved tickets.

## Test Plan
- Verify routing between all major screens works directly and through in-app navigation.
- Verify movie selection carries the correct showtime and theater into seat booking.
- Verify seat selection enforces unavailable seats and updates totals correctly.
- Verify checkout produces a saved ticket with the expected movie, seats, time, and price.
- Verify saved tickets persist after refresh and render empty/non-empty states correctly.
- Verify responsive behavior on narrow mobile widths and standard desktop widths.

## Assumptions
- No backend, authentication, or real payment integration in v1.
- Static mock data is the source of truth for movies, theaters, showtimes, pricing, and seat availability.
- Saved tickets are stored locally in browser storage.
- Search/filters are out of scope for the first implementation, since the chosen extra for v1 is saved tickets.
- Tailwind CSS is the chosen styling approach even though the default recommendation was plain CSS, and the design should still feel custom rather than utility-template driven.
