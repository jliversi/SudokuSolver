class SquareSet {
  constructor(puzzle) {
    this.puzzle = puzzle;

    this.sqrs = [];
  }

  setup() {
    this.usedValues = new Set();
    this.neededValues = new Set();
    // add pre-filled values to usedValues
    this.eachSquare(sqr => {
      if (sqr.val > 0) this.usedValues.add(sqr.val);
    })
    // then collect unused nums in needValues
    for (let i = 1; i < (this.puzzle.dim + 1); i++) {
      if (!this.usedValues.has(i)) this.neededValues.add(i);
    }
  }

  addVal(val) {
    this.usedValues.add(val);
    this.neededValues.delete(val);
    this.eachSquare(sqr => {
      sqr.possVals.delete(val);
    })
  }
  removeVal(val) {
    this.usedValues.delete(val);
    this.neededValues.add(val);
  }


  eachSquare(cb) {
    for (let i = 0; i < this.sqrs.length; i++) {
      const sqr = this.sqrs[i];
      cb(sqr, i);
    }
  }

}

export default SquareSet;