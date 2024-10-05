export default class GameCell {
  constructor(mined) {
    this.mine = mined;
    this.revealed = false;
    this.neighbors = null;
    this.flagged = false;
  }

  reveal() {
    if (!this.revealed) {
      this.revealed = true;
    }
  }

  flag() {
    this.flagged = !this.flagged;
  }
}
