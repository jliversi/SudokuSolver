class SudokuDisplay {
  constructor(puzzle, mainEle)  {
    this.puzzle = puzzle;
    this.dim = puzzle.dim;

    this.mainEle = mainEle;
    this.domSqrs = Array.from({length: puzzle.dim}, ()=> []);
  }


  createDOMGrid() {
    for (let i = 0; i < this.dim; i++) {
      const row = document.createElement('ul');
      row.classList.add('row');
      row.id = `row-${i}`;
      for (let j = 0; j < this.dim; j++) {
        const square = document.createElement('li');
        square.classList.add('square');
        square.id = `sqr-[${i},${j}]`;
        this.domSqrs[i][j] = square;
        row.appendChild(square);
      }
      this.mainEle.appendChild(row);
    }
  }
}

export default SudokuDisplay;