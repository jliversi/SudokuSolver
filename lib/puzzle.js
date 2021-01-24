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

  solve() {
    let valueSet = true;

    while (valueSet && !this.solved) {
      valueSet = false;
      this.eachSqr(sqr => {
        if (sqr.possVals.size === 1) {
          valueSet = true;
          // unfortunately the easiest way to get first element in 1 ele set
          const newVal = sqr.possVals.values().next().value;
          sqr.setVal(newVal);
        }
      });

      this.determineSolved();
    }
    if (this.solved) {
      console.log('done!')
    } else {
      console.log('failed...')
    }
  }

}

export default Puzzle;