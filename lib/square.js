import { setUnion } from './util';

class Square {
  constructor(puzzle, pos, val, row, col, box) {
    this.puzzle = puzzle;
    this.display = puzzle.display;
    this.domSqr = this.display.domSqrs[pos[0]][pos[1]];
    this.pos = pos;
    this.val = val;
    this.complete = val > 0;
    this.row = row;
    this.row.sqrs.push(this);
    this.col = col;
    this.col.sqrs.push(this);
    this.box = box;
    this.box.sqrs.push(this);

    this.filled = val > 0;
    
    this.possVals = new Set();
  }

  setup() {
    if (this.alreadySet) return;
    this.alreadySet = true;
    this.domSqr.innerHTML = this.complete ? this.val : '';

    // determine unusable numbers
    const rowUsed = this.row.usedValues;
    const colUsed = this.col.usedValues;
    const boxUsed = this.box.usedValues;

    if (this.complete) {
      return;
    }

    const cantUse = setUnion(rowUsed, colUsed, boxUsed);
    for (let i = 1; i <= this.puzzle.dim; i++) {
      if (!cantUse.has(i)) this.possVals.add(i);
    }
  }

  setVal(val) {
    this.val = val;

    this.display.printOrder.push({pos: this.pos, val: val})

    this.row.addVal(val);
    this.col.addVal(val);
    this.box.addVal(val);

    this.complete = true;
  }
}

export default Square;