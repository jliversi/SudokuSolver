class SudokuNode {
    constructor(puzzle, value, idx, row, col) {
        this.puzzle = puzzle;
        this.idx = idx;
        this.value = value;
        this.complete = value > 0;
        this.possibles = [];

        const rowIdx = idx % puzzle.dim;
        this.row = row ? row : puzzle.rows[rowIdx];
        this.row.nodes.push(this);

        const colIdx = Math.floor(idx / puzzle.dim);
        this.col = col ? col : puzzle.cols[colIdx];
        this.col.nodes.push(this);

        const squareIdx = this.calcSquareIdx(rowIdx, colIdx);
        this.square = puzzle.squares[squareIdx];
        this.square.nodes.push(this);

    }

    setup() {
        if (this.alreadySet) { return }
        // todo
        // from row, col, square, populate possibles
        this.alreadySet = true;
    }

    calcSquareIdx(rowIdx, colIdx) {
        const numSets = Math.sqrt(this.puzzle.dim);
        const rowSet = Math.floor(rowIdx / numSets);
        const colSet = Math.floor(colIdx / numSets);
        return colSet + (rowSet * 3);
    }
}