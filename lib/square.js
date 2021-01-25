import { setUnion, setIntersection } from './util';

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
    
    this.possVals = new Set();
    this.causesContradiction = new Set();
  }

  setup() {
    if (this.alreadySet) return;
    this.alreadySet = true;
    this.domSqr.innerHTML = this.complete ? this.val : '';

    if (this.complete) return;

    // determine unusable numbers
    const rowNeeded = this.row.neededValues;
    const colNeeded = this.col.neededValues;
    const boxNeeded = this.box.neededValues;

    this.possVals = setIntersection(rowNeeded, colNeeded, boxNeeded);
  }

  resetPosses() {
    if (this.complete) return;
    const rowNeeded = this.row.neededValues;
    const colNeeded = this.col.neededValues;
    const boxNeeded = this.box.neededValues;

    this.possVals = setIntersection(rowNeeded, colNeeded, boxNeeded);
  }


  setVal(val) {
    this.val = val;

    // REMOVE
    // this.domSqr.innerHTML = val;
    // REMOVE

    // this.display.printOrder.push({pos: this.pos, val: val})


    /// REMOVE
    // if (this.display.printOrder.length % 10000 === 0) {
    //   debugger
    // }

    this.row.addVal(val);
    this.col.addVal(val);
    this.box.addVal(val);

    this.complete = true;
  }

  undoVal() {
    // this.display.printOrder.push({ pos: this.pos, val: '' })

    /// REMOVE
    // if (this.display.printOrder.length % 10000 === 0) {
    //   debugger
    // }

    // REMOVE
    // this.domSqr.innerHTML = '';
    // if (this.pos[0] === 1 && this.pos[1] === 3) {
    //   debugger
    // }
    // REMOVE

    
    this.row.removeVal(this.val);
    this.col.removeVal(this.val);
    this.box.removeVal(this.val);
    
    this.val = 0;
    this.complete = false;
  }

  calcSetsNeededMin() {
    const rn = this.row.neededValues.size;
    const cn = this.col.neededValues.size;
    const bn = this.box.neededValues.size;
    return [rn,bn,cn].reduce((acc, el) => acc < el ? acc : el)
  }

  calcSetsNeededTotal() {
    const rn = this.row.neededValues.size;
    const cn = this.col.neededValues.size;
    const bn = this.box.neededValues.size;
    return rn + cn + bn;
  }
}

export default Square;