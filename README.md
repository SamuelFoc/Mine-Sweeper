# MineSweeper Game

This project is a customizable **MineSweeper** game built with React. It allows users to choose difficulty levels, manage the game state, and play the classic MineSweeper game directly in their browser.

## Features

- Four difficulty levels: **Easy**, **Medium**, **Hard**, and **Pro**.
- Dynamic grid sizing based on difficulty level.
- Ability to reveal and flag cells.
- Real-time game status updates (win/lose).
- Option to restart the game after finishing.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Game Logic](#game-logic)
- [Customization](#customization)
- [License](#license)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/SamuelFoc/Mine-Sweeper.git
   cd minesweeper
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the game in your browser.

## Usage

To use the `MineSweeper` component in your own project, simply import it and integrate it as shown below:

```javascript
"use client";
import { useState } from "react";
import MineSweeper from "./components/MineSweeper/MineSweeper";

export default function Home() {
  const [difficulty, setDifficulty] = useState("easy");

  const getSizeByDifficulty = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return 10;
      case "medium":
        return 10;
      case "hard":
        return 15;
      case "pro":
        return 15;
      default:
        return 10;
    }
  };

  return (
    <div className="w-full h-full max-w-5xl flex flex-col items-center justify-center">
      <MineSweeper
        size={getSizeByDifficulty(difficulty)}
        difficulty={difficulty}
      />
      <select
        className="mt-16 border-4 border-gray-700 rounded-lg px-4 py-2 bg-gray-600 text-white font-bold"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="pro">Pro</option>
      </select>
    </div>
  );
}
```

### Props

- `size`: Determines the grid size for the MineSweeper board.
- `difficulty`: Sets the difficulty level (`easy`, `medium`, `hard`, `pro`), which also determines the number of mines.

## Components

### `MineSweeper`

The main component that controls the game logic, initializes the game grid, and updates the state based on player actions. It handles:

- **Grid initialization** with a specified number of mines based on difficulty.
- **State management** for the grid and game status (win/lose).
- **Rendering** the game board.

### `Cell`

Represents each cell in the grid. Handles user interactions (left-click to reveal, right-click to flag), and displays either a mine, number of neighboring mines, or a blank space.

### `Mine`

A simple component that renders the mine symbol when a mine is revealed.

### `Neighbors`

Displays the number of mines in neighboring cells, if any.

## Game Logic

- The game logic is handled by a `Game` class (imported from `./modules/Game.mjs`), which handles the initialization of the grid, the placement of mines, and player actions (revealing cells, flagging cells).
- The game checks for win/lose conditions each time a cell is revealed.

### Core Logic:

- **Flagging a Cell**: Players can flag a cell they suspect contains a mine by right-clicking (or holding on touch devices).
- **Revealing a Cell**: Left-clicking reveals a cell. If it's a mine, the player loses. If it's not a mine, the game continues.
- **Winning and Losing**: If all non-mine cells are revealed, the player wins. If a mine is revealed, the player loses.

## Customization

You can modify the difficulty levels or grid size by adjusting the `getSizeByDifficulty` function and the number of mines assigned in the `MineSweeper` component.

Example of adjusting difficulty:

```javascript
const mines = new Map();
mines.set("easy", Math.floor(0.05 * size ** 2)); // Adjust mine density
mines.set("medium", Math.floor(0.1 * size ** 2));
mines.set("hard", Math.floor(0.3 * size ** 2));
mines.set("pro", Math.floor(0.5 * size ** 2));
```

## License

This project is licensed under the MIT License.

Feel free to modify and distribute this code as per the terms of the license.

---

Enjoy your game of MineSweeper! 🎮
