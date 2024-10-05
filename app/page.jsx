"use client";
import { useState } from "react";
import MineSweeper from "./components/MineSweeper/MineSweeper";

export default function Home() {
  // Use useState to manage the difficulty level
  const [difficulty, setDifficulty] = useState("easy");

  // Define size based on difficulty (optional)
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
        className="mt-16 border-4 border-gray-700 rounded-lg px-4 py-2 bg-gray-600 text-white font-bold font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
