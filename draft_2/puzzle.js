import SudokuDisplay from './display';
import Square from './square';
import SquareSet from './square_set';
import { calcBoxIdx } from './util';

class Puzzle {
  constructor(input, mainEle) {
    // input should be an array of arrays of integers (0 for empty)
    this.input = input;
    this.solved = false 
    this.dim = input.length


    this.display = new SudokuDisplay(this, mainEle);
    this.rows = [];
    this.cols = [];
    this.boxes = [];
    this.sqrs = Array.from({ length: this.dim }, () => []);


    this.setup();
  }

  setup() {
    this.display.createDOMGrid();
    this.createSets();
    this.createSqrs();

    this.setupSets();
    this.setupSqrs();
    // this.setupNodeSetsPostNodes();
  }

  createSets() {
    for (let i = 0; i < this.dim; i++) {
      const row = new SquareSet(this);
      const col = new SquareSet(this);
      const square = new SquareSet(this);
      this.rows.push(row);
      this.cols.push(col);
      this.boxes.push(square);
    }
  }

  createSqrs() {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        const val = this.input[i][j];
        const row = this.rows[i];
        const col = this.cols[j];
        const box = this.boxes[calcBoxIdx(i,j,this.dim)]
        const newSqr = new Square(this, [i,j], val, row, col, box);
        this.sqrs[i][j] = newSqr;
      }
    }
  }

  setupSets() {
    this.eachSet(set => set.setup());
  }

  setupSqrs() {
    this.eachSqr(sqr => sqr.setup());
  }



  // methods for iteration

  allSets() {
    // TODO: replace this with a heap which always maintains the row/col/square worth checking next

    return this.rows.concat(this.cols).concat(this.boxes);
  }

  eachSet(cb) {
    const allSets = this.allSets();
    for (let i = 0; i < allSets.length; i++) {
      const set = allSets[i];
      cb(set, i);
    }
  }

  eachSqr(cb) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        const sqr = this.sqrs[i][j];
        cb(sqr,[i,j])
      }
    }
  }

  // methods for solving
  determineSolved() {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        const sqr = this.sqrs[i][j];
        if (!sqr.complete) return;
      }
    }
    this.solved = true;
  }

  hasContradiction() {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        const sqr = this.sqrs[i][j];
        if (sqr.possVals.size === 0 && sqr.val === 0) {
          return true;
        }
      }
    }
    return false;
  }

  undo(toUndo) {
    for (let i = 0; i < toUndo.length; i++) {
      const sqr = toUndo[i];
      if (sqr.pos[0] === 2 && sqr.pos[1] === 3) {
        debugger
      }
      sqr.undoVal();
    }
    this.eachSqr(sqr => sqr.resetPosses())
  }

  // helper function to sort options to guess/recurse on
  sortUnsolved(unsolved) {
    return unsolved.sort((a, b) => {
      let res = a.calcSetsNeededMin() - b.calcSetsNeededMin();
      if (res === 0) {
        res = a.calcSetsNeededTotal() - b.calcSetsNeededTotal();
      } 
      if (res === 0) {
        res = a.possVals.size - b.possVals.size;
      }
      return res;
    });
  }

  solve(guess) {
    let valueSet = true;
    let toUndo = [];
    if (guess) {
      guess.sqr.setVal(guess.val);
      guess.sqr.possVals = new Set();
      toUndo.push(guess.sqr);
    }

    while (valueSet && !this.solved) {
      valueSet = false;
      this.eachSqr(sqr => {
        if (sqr.possVals.size === 1) {
          // unfortunately the easiest way to get first element in 1 ele set
          const newVal = sqr.possVals.values().next().value;
          if (!sqr.causesContradiction.has(newVal)) {
            toUndo.push(sqr);
            valueSet = true;
            sqr.setVal(newVal);
          }
        }
      });
      if (this.hasContradiction()) {
        // console.log("contradiction!")
        this.undo(toUndo);
        return false;
      }
      this.determineSolved();
    }
    if (!valueSet) {
      // time to recurse with a guess
      let wasRecSolved = false;
      
      let unsolvedSqrs = [];
      this.eachSqr((sqr, pos) => {
        if (!sqr.complete) unsolvedSqrs.push(sqr);
      })
      // sort unsolved squares so we start with fewest options
      unsolvedSqrs = this.sortUnsolved(unsolvedSqrs);

      for(let i = 0; !wasRecSolved && i < unsolvedSqrs.length; i++) {
        const currentSqr = unsolvedSqrs[i];
        const posses = Array.from(currentSqr.possVals);
        for (let j = 0; j < posses.length; j++) {
          const valToTry = posses[j];
          wasRecSolved = this.solve({sqr: currentSqr, val: valToTry})
          if (wasRecSolved) {
            break;
          } else {
            currentSqr.causesContradiction.add(valToTry);
          }
        }
      }
    }

    if (typeof guess === 'undefined') {
      // this.display.orderPrint(0);
      this.eachSqr(sqr => sqr.domSqr.innerHTML = sqr.val)
    }

    if (this.solved) {
      // console.log('done!');
      return true;
    } else {
      this.undo(toUndo);
      // console.log('failed...');
      return false;
    }
  }

}

export default Puzzle;