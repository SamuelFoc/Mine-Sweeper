import GameCell from "./GameCell.mjs";

export default class Game {
  #grid;
  #size;
  #mines;
  #revealed;
  constructor(size, mines) {
    this.#size = size;
    this.#mines = mines;
    this.#grid = new Array(size);
    this.#revealed = null;
    this.winner = undefined;
  }

  getSize() {
    return this.#size;
  }

  getMinesNum() {
    return this.#mines;
  }

  initializeGame() {
    const minesPositions = this.#generateMines(this.#mines, this.#size);
    let mines = [];
    for (let i = 0; i < this.#size; i++) {
      this.#grid[i] = new Array(this.#size);
      for (let j = 0; j < this.#size; j++) {
        let mine_it = this.#containsPair(minesPositions, [i, j]);
        this.#grid[i][j] = new GameCell(mine_it);
        if (mine_it) {
          mines.push([i, j]);
        }
      }
    }
    this.#countNeighborMines();
  }

  getGrid() {
    return this.#grid;
  }

  flagCell(i, j) {
    console.log("AAAA");
    this.#grid[i][j].flag();
  }

  revealCell(i, j) {
    this.#revealed++;

    if (this.#checkWin()) {
      this.#gameOver();
    }

    if (this.#grid[i][j].mine) {
      return this.#gameOver();
    }
    // Base case: If the cell is already revealed, do nothing.
    if (this.#grid[i][j].revealed) {
      return;
    }

    // Reveal the current cell.
    this.#grid[i][j].reveal();

    // If the current cell has neighbors (i.e., it is not zero), stop the propagation.
    if (this.#grid[i][j].neighbors > 0) {
      return;
    }

    // Reveal all surrounding cells that have zero neighbors (recursively).
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        // Skip the current cell itself.
        if (x === 0 && y === 0) {
          continue;
        }

        // Calculate new indices.
        const newI = i + x;
        const newJ = j + y;

        // Ensure new indices are within bounds.
        if (
          newI >= 0 &&
          newI < this.#grid.length &&
          newJ >= 0 &&
          newJ < this.#grid[0].length
        ) {
          // Recursively reveal surrounding cells if they haven't been revealed yet.
          if (!this.#grid[newI][newJ].revealed) {
            this.revealCell(newI, newJ);
          }
        }
      }
    }
  }

  #checkWin() {
    if (this.#revealed === this.#size ** 2 - this.#mines) {
      return true;
    }
  }

  #gameOver() {
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        this.#grid[i][j].revealed = true;
        this.winner =
          this.#revealed === this.#size ** 2 - this.#mines ? true : false;
      }
    }
  }

  #generateMines(numPairs, threshold) {
    let pairs = [];
    let generatedPairs = new Set();
    while (pairs.length < numPairs) {
      let i = Math.floor(Math.random() * threshold);
      let j = Math.floor(Math.random() * threshold);
      let pairString = `${i},${j}`;
      if (!generatedPairs.has(pairString)) {
        pairs.push([i, j]);
        generatedPairs.add(pairString);
      }
    }
    return pairs;
  }

  #containsPair(pairs, targetPair) {
    return pairs.some(
      (pair) => pair[0] === targetPair[0] && pair[1] === targetPair[1]
    );
  }

  #countNeighborMines() {
    for (let i = 0; i < this.#size; i++) {
      for (let j = 0; j < this.#size; j++) {
        let mines = 0;

        // Check all neighboring cells
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            // Skip the current cell itself
            if (x === 0 && y === 0) {
              continue;
            }

            // Calculate neighbor coordinates
            let ni = i + x;
            let nj = j + y;

            // Ensure the neighbor is within bounds
            if (ni >= 0 && ni < this.#size && nj >= 0 && nj < this.#size) {
              if (this.#grid[ni][nj].mine) {
                mines++;
              }
            }
          }
        }

        // Store the count of neighboring mines (assuming you have a way to store it)
        this.#grid[i][j].neighbors = mines;
      }
    }
  }
}
