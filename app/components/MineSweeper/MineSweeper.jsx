"use client";
import { useState, useRef, useEffect } from "react";
import Cell from "./Cell";
import Game from "./modules/Game.mjs";
import styles from "./styles/MineSweeper.module.css";

export default function MineSweeper({ size, difficulty }) {
  const mines = new Map();
  mines.set("easy", Math.floor(0.05 * size ** 2));
  mines.set("medium", Math.floor(0.1 * size ** 2));
  mines.set("hard", Math.floor(0.3 * size ** 2));
  mines.set("pro", Math.floor(0.5 * size ** 2));

  // Use useRef to persist the Game instance across re-renders
  const gameRef = useRef(null);

  // Set up state to manage the game grid
  const [grid, setGrid] = useState([]);
  const [gameStatus, setGameStatus] = useState(undefined); // Track the game status

  // Initialize game only after the initial render (client-side)
  useEffect(() => {
    initializeGame();
  }, [size]);

  const initializeGame = () => {
    // Create a new Game instance and initialize it
    gameRef.current = new Game(size, mines.get(difficulty));
    gameRef.current.initializeGame();

    // Update the grid state with the initialized game grid
    setGrid([...gameRef.current.getGrid()]);
    setGameStatus(undefined); // Reset the game status
  };

  const flagCell = (idx_column, idx_cell) => {
    gameRef.current.flagCell(idx_column, idx_cell);
    setGrid([...gameRef.current.getGrid()]);
  };

  const revealCell = (idx_column, idx_cell) => {
    gameRef.current.revealCell(idx_column, idx_cell);
    // Update the state with the new grid after revealing a cell
    setGrid([...gameRef.current.getGrid()]); // Trigger a re-render
    // Update the game status if the game is over
    if (gameRef.current?.winner !== undefined) {
      setGameStatus(gameRef.current.winner);
    }
  };

  return (
    <>
      <h1 className={styles.title}>Mine - Sweeper</h1>
      <div
        className={
          gameStatus === true || gameStatus === false
            ? styles.container_result
            : styles.container
        }
      >
        {grid.map((column, idx_column) => (
          <div className={styles.column} key={"column" + idx_column}>
            {column.map((cell, idx_cell) => (
              <Cell
                key={"cell" + idx_cell}
                data={cell}
                reveal={() => revealCell(idx_column, idx_cell)}
                flag={() => flagCell(idx_column, idx_cell)}
              />
            ))}
          </div>
        ))}
        {gameStatus === true ? (
          <div className={styles.winner}>WINNER</div>
        ) : gameStatus === false ? (
          <div className={styles.looser}>LOSER</div>
        ) : (
          ""
        )}
        {gameStatus !== undefined && (
          <div onClick={initializeGame} className={styles.try_again}>
            TRY AGAIN
          </div>
        )}
      </div>
    </>
  );
}
