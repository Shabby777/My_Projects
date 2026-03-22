# Simple Maze Game

A small vanilla JavaScript maze game built with HTML Canvas.

## Play on GitHub Pages

If this repository is published with GitHub Pages, open the game at:

```text
https://<your-github-username>.github.io/<repo-name>/SimpleMazeGame/
```

You can also go directly to the entry file if you prefer the explicit path:

```text
https://<your-github-username>.github.io/<repo-name>/SimpleMazeGame/index.html
```

### Example

If your GitHub username is `alexdev` and the repository name is `My_Projects`, the URL would be:

```text
https://alexdev.github.io/My_Projects/SimpleMazeGame/
```

## Play locally on a client PC

### Option 1: Open the file directly

1. Copy the entire `SimpleMazeGame` folder to the client computer.
2. Open the folder.
3. Double-click `index.html`.
4. The game should start immediately in the default browser.

### Option 2: Run from a simple local server

This is useful if the client prefers opening the game through `http://localhost`.

#### With Python installed

Open a terminal in the `SimpleMazeGame` directory and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

#### With VS Code Live Server

1. Open the `SimpleMazeGame` folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

## Controls

- **Arrow keys**: move the player
- **Restart Game**: generate a new random maze and reset the timer

## Files

- `index.html` - page structure and game UI
- `style.css` - layout and visual styling
- `script.js` - maze generation, rendering, movement, animation, and timer logic
