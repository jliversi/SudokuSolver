class SudokuDisplay {
  constructor(puzzle, mainEle)  {
    this.puzzle = puzzle;
    this.dim = puzzle.dim;

    this.mainEle = mainEle;
    this.domSqrs = Array.from({length: puzzle.dim}, ()=> []);

    // used for animated print after solve
    this.printOrder = [];
  }

  // setup grid
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

  // print at the end of solve
  orderPrint(ms = 5, i = 0) {
    setTimeout(() => {
      const { pos, val } = this.printOrder[i];
      this.domSqrs[pos[0]][pos[1]].innerHTML = val;
      if (i < this.printOrder.length - 1) {
        this.orderPrint(ms, i + 1);
      }
    }, ms);
  }
}

export default SudokuDisplay;