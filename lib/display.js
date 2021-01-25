class SudokuDisplay {
  constructor(puzzle, mainEle)  {
    this.puzzle = puzzle;
    this.dim = puzzle.dim;

    this.mainEle = mainEle;
    this.domSqrs = Array.from({length: puzzle.dim}, ()=> []);
  }

  // setup grid
  createDOMGrid() {
    for (let i = 0; i < this.dim; i++) {
      const row = document.createElement('ul');
      row.classList.add('row');
      row.id = `row-${i}`;
      for (let j = 0; j < this.dim; j++) {
        const li = document.createElement('li');
        li.classList.add('square');
        const innerP = document.createElement('p');
        li.appendChild(innerP);
        this.domSqrs[i][j] = innerP;
        row.appendChild(li);
      }
      this.mainEle.appendChild(row);
    }
  }

  simplePrint() {
    this.puzzle.grid.forEach((row,i) => {
      row.forEach((val, j) => {
        this.domSqrs[i][j].innerHTML = val > 0 ? val : '';
      });
    });
  }
  
  fancyPrint() {
    let ms = 0;
    this.puzzle.input.forEach((row, i) => {
      row.forEach((val, j) => {
        const node = this.domSqrs[i][j];
        if (val === 0) {
          setTimeout(() => {
            const newVal = this.puzzle.grid[i][j];
            node.innerHTML = newVal;
            node.classList.add('content');
          }, ms);
          ms += 50;
        }
      });
    });
  }
}

export default SudokuDisplay;