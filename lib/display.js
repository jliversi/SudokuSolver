import Puzzle from './puzzle';
import { solveCurrent, resetToSolve } from './index'

class SudokuDisplay {
  constructor(mainEle, dim)  {
    this.dim = dim;

    this.mainEle = mainEle;
    this.domSqrs = Array.from({length: dim}, ()=> []);
    this.domRows = [];
    this.createDOMGrid();
  }

  newPuzzle(input) {
    if (this.mainEle.lastChild.tagName === 'P') {
      this.mainEle.removeChild(this.mainEle.lastChild);
    }
    this.puzzle = new Puzzle(input, this);
    this.puzzle.setup();
  }

  createDOMGrid() {
    this.mainEle.className = '';
    this.mainEle.classList.add('main');
    this.mainEle.classList.add(`grid-${this.dim}`);
    for (let i = 0; i < this.dim; i++) {
      const row = document.createElement('ul');
      row.classList.add('row');
      for (let j = 0; j < this.dim; j++) {
        const square = document.createElement('li');
        const squareInput = document.createElement('input');
        squareInput.type = 'number';
        squareInput.min = 1;
        squareInput.max = this.dim;
        squareInput.addEventListener('change', e => {
          if (e.target.value > this.dim) {
            e.target.value = this.dim;
          }
        });
        square.appendChild(squareInput);
        square.classList.add('square');
        this.domSqrs[i][j] = squareInput;
        row.appendChild(square);
      }
      this.domRows.push(row);
      this.mainEle.appendChild(row);
    }
  }

  dumpGrid()  {
    while (this.mainEle.firstChild) {
      this.mainEle.removeChild(this.mainEle.firstChild);
    }
  }

  readInput() {
    return this.domSqrs.map(row => {
      return row.map(sqr => {
        return sqr.value.length > 0 ? parseInt(sqr.value) : 0;
      })
    })
  }

  simplePrint() {
    this.puzzle.grid.forEach((row,i) => {
      row.forEach((val, j) => {
        this.domSqrs[i][j].value = val > 0 ? val : '';
      });
    });
  }

  checkForBadInput() {
    const broken = this.puzzle.findContradiction();
    if (broken) {
      const error = document.createElement('p');
      error.innerHTML = 'Unsolvable from current input';
      error.classList.add('error');
      this.mainEle.appendChild(error);
      const solveButton = document.getElementById('solve');
      solveButton.innerHTML = 'Change an input to try again';

      const _removeBadSqr = e => {

        if (this.mainEle.lastChild.tagName === 'P') {
          this.mainEle.removeChild(this.mainEle.lastChild);
        }
        solveButton.innerHTML = 'Solve';
        solveButton.disabled = false;

        broken.forEach(([x, y]) => {
          const brokenSqr = this.domSqrs[x][y];
          brokenSqr.classList.remove('bad-sqr');
          brokenSqr.removeEventListener('change', _removeBadSqr);
        })

        document.querySelectorAll('button').forEach(button => {
          button.removeEventListener('click', _removeBadSqr);
        })
      }

      broken.forEach(([x,y]) => {
        const brokenSqr = this.domSqrs[x][y];
        brokenSqr.classList.add('bad-sqr');
        brokenSqr.addEventListener('change', _removeBadSqr);
      })
      document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', _removeBadSqr);
      })
      return true;
    } else {
      return false;
    }
  }

  badPuzzle() {
    const error = document.createElement('p');
    error.innerHTML = 'Unsolvable from current input';
    error.classList.add('error'); 
    this.mainEle.appendChild(error);
    const solveButton = document.getElementById('solve');
    solveButton.innerHTML = 'Change an input to try again'

    const _removeBadPuzzle = e => {
      if (this.mainEle.lastChild.tagName === 'P') {
        this.mainEle.removeChild(this.mainEle.lastChild);
      }
      solveButton.innerHTML = 'Solve';
      solveButton.disabled = false;
      document.querySelectorAll('input').forEach(sqr => {
        sqr.removeEventListener('change', _removeBadPuzzle);
      })
      document.querySelectorAll('button').forEach(button => {
        button.removeEventListener('click', _removeBadPuzzle);
      })
    }
    document.querySelectorAll('input').forEach(sqr => {
      sqr.addEventListener('change', _removeBadPuzzle);
    })
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', _removeBadPuzzle);
    })
    
  }
  
  fancyPrint(sqrsToPrint) {
    let ms = 0;
    sqrsToPrint.forEach(([x,y], i) => {
      const node = this.domSqrs[x][y];
      const val = node.value;
      if (val === "") {
        setTimeout(() => {
          const newVal = this.puzzle.grid[x][y];
          node.value = newVal;
          node.classList.add('content');

          if (i === sqrsToPrint.length - 1) {

            const solveButton = document.getElementById('solve');
            solveButton.disabled = false;
            solve.innerHTML = 'Reset';
            solve.removeEventListener('click', solveCurrent);

            document.querySelectorAll('button').forEach(button => {
              button.addEventListener('click', resetToSolve)
            });
          }


        }, ms);
        ms += 50;
      }
    });
  }
}

export default SudokuDisplay;