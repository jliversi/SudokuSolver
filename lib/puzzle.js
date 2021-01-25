import SudokuDisplay from './display';
import { calcBoxIdx, calcMissingNums, boxIdxToPosArr, setIntersection } from './util';

class Puzzle {
  constructor(input, mainEle) {
    // input should be an array of arrays of integers (0 for empty)
    this.input = input;
    this.grid = input.map(el => el.slice());
    this.solved = false 
    this.dim = input.length

    this.display = new SudokuDisplay(this, mainEle);
    this.setup();
  }

  setup() {
    this.display.createDOMGrid();
    this.display.simplePrint();

    this.setupSets();
    this.setupSqrs();
  }


  setupSets() {
    this.rows = Array.from({ length: this.dim }, (_,i) => {
      return calcMissingNums(this.grid[i],this.dim);
    });

    this.cols = Array.from({ length: this.dim }, (_,i) => {
      return calcMissingNums(this.grid.map(row => row[i]),this.dim);
    });

    this.boxes = Array.from({ length: this.dim }, (_,i) => {
      const boxArr = boxIdxToPosArr(i, this.dim).map(([x,y]) => this.grid[x][y]);
      return calcMissingNums(boxArr,this.dim);
    });
  }

  setupSqrs() {
    this.possGrid = this.grid.map((row, i) => {
      return row.map((val,j) => {
        if (val > 0) {
          return new Set();
        }
        const rowSet = this.rows[i];
        const colSet = this.cols[j];
        const boxSet = this.boxes[calcBoxIdx(i,j,this.dim)];
        return setIntersection(rowSet, colSet, boxSet);
      });
    });
  }

  eachPos(cb) {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        cb(i, j);
      }
    }
  }

  firstRun() {
    let valueSet = true;
    while (valueSet) {
      valueSet = false;
      this.eachPos((x,y) => {
        if (this.possGrid[x][y].size === 1) {
          // unfortunately the easiest way to get first element in 1 ele set
          const newVal = this.possGrid[x][y].values().next().value;
          this.grid[x][y] = newVal;
          this.rows[x].delete(newVal);
          this.cols[y].delete(newVal);
          this.boxes[calcBoxIdx(x,y,this.dim)].delete(newVal);
          valueSet = true;
        }
      });
      this.setupSqrs();
    }
  }

  backtrack() {
    const unsolved = [];
    this.eachPos((x,y) => {
      if (this.grid[x][y] === 0) unsolved.push([x,y]);
    })
    this.tryGrid = Array.from({length: this.dim}, () => Array.from({length: this.dim}, () => 0));
    for (let i = 0; i < unsolved.length; i++) {

      const [x,y] = unsolved[i];
      const valToTry = this.grid[x][y] + 1;
      this.grid[x][y] = 0;
      if (valToTry > this.dim) {
        this.grid[x][y] = 0;
        i -= 2;
      } else if (this.ruleBreak(x,y,valToTry)) {
        this.grid[x][y] = valToTry;
        i -= 1;
      } else {
        this.grid[x][y] = valToTry;
      }
    }
    return unsolved;
  }

  ruleBreak(x,y,val) {
    const row = this.grid[x];
    const col = this.grid.map(row => row[y]);
    const box = boxIdxToPosArr(calcBoxIdx(x,y,this.dim), this.dim).map(([x, y]) => this.grid[x][y]);
    if (row.includes(val) || col.includes(val) || box.includes(val)) {
      return true;
    } else {
      return false 
    }
  }


  solve() {
    this.firstRun();
    const neededBacktrack = this.backtrack();
    this.display.fancyPrint();
  }
}

export default Puzzle;