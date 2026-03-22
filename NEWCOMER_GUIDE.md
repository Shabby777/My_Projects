# Newcomer Guide: `My_Projects`

## What this repository is
This repository is a **collection of learning projects** and mini-apps rather than a single production application.

At the root, the repository README states that it contains various sites/apps built while learning concepts and implementation details.

## High-level structure
Most top-level folders are independent projects with their own HTML/CSS/JS (or React) setup.

### 1) Vanilla JavaScript mini-projects
Examples:
- `MovieSearch-App`
- `github-finder`
- `leaderboard`
- `geekpok`
- `nested_comment`
- `JS/age-calculator`
- `JS/emoji-project`
- `stopwatch`

Pattern:
- `index.html`
- `style.css`
- `script.js`
- optional `README.md`

These are good for learning DOM APIs, event handling, and consuming external APIs.

### 2) API-driven front-end demos
- `MovieSearch-App`: uses OMDB API via `fetch` and renders movies dynamically.
- `github-finder`: fetches GitHub user profile data and displays cards.
- `geekpok`: Pokémon API fetch demo.
- `Crypto-Search-Application`: crypto market data display app.

### 3) Slightly structured front-end architecture
- `Project-Sticky-Notes` uses a Controller/View/Model style separation.
- `nested_comment` has utility-like functions for comment creation, reply nesting, counters, and toggling UI state.

### 4) React-based projects
- `google-drive-clone`: Create React App style project with Firebase integration and componentized UI.
- `fromik-and-yup`: React + Webpack/Babel setup, with a Formik/Yup login validation demo.

## Important project-level notes

## `google-drive-clone`
- Uses `react-scripts` scripts (`start`, `build`, `test`, `eject`).
- Uses Firebase auth, storage, and Firestore.
- Main app composes `Header`, `Sidebar`, `FilesView`, and `SideIcons` components.
- Login flow toggles between authenticated app shell and login screen.

If you are learning modern React app structure, this is one of the best folders to start with.

## `fromik-and-yup`
- Uses custom Webpack config + Babel.
- Contains a `MyForm` component demonstrating Formik form state + Yup schema validation.
- Useful for learning form validation flow and bundler configuration basics.

## `Project-Sticky-Notes`
- Uses classes for View/Controller/Model logic.
- Notes are stored in an in-memory object keyed by title.
- View dynamically creates DOM, attaches handlers, and redraws note list.

Great for learning classical JS architecture and state/view synchronization without frameworks.

## `nested_comment`
- Builds nested comments/replies dynamically with helper functions.
- Includes character counters, delete actions, and show/hide for replies/forms.
- Uses Tailwind utility classes in generated markup.

Great for practicing recursive/nested UI logic in plain JavaScript.

## Where to start as a newcomer
1. **Pick one vanilla app and trace the lifecycle**:
   - Open `index.html`
   - See what `script.js` selects from DOM
   - Follow event listeners -> `fetch` -> render functions
2. **Then inspect `Project-Sticky-Notes`** for explicit View/Controller/Model boundaries.
3. **Then move to React apps**:
   - `google-drive-clone` for component structure + Firebase
   - `fromik-and-yup` for form state and validation patterns

## Things to learn next
- DOM rendering patterns and event delegation in vanilla JS projects.
- Error handling and loading states for API requests.
- Modularization: splitting large scripts into reusable modules.
- React fundamentals: props/state/component composition.
- Firebase basics: auth, Firestore, and storage usage.
- Build tooling: Babel + Webpack config essentials.

## Practical contribution ideas
- Add consistent README templates for all project folders.
- Add a root index page linking each mini-project with short descriptions.
- Normalize naming (`formik` typo in `fromik-and-yup` if intentional/non-intentional).
- Add linting/prettier and basic test scaffolds for React projects.
