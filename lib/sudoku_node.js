class SudokuNode {
    constructor(puzzle, value, idx, row, col, square) {
        this.puzzle = puzzle;
        this.idx = idx;

        this.value = value;
        this.complete = value > 0;
        this.possibles = new Set();

        const rowIdx = Math.floor(idx / puzzle.dim);
        this.row = row ? row : puzzle.rows[rowIdx];
        this.row.nodes.push(this);
        this.rowIdx = this.row.nodes.length - 1;
        
        const colIdx = idx % puzzle.dim;
        this.col = col ? col : puzzle.cols[colIdx];
        this.col.nodes.push(this);
        this.colIdx = this.col.nodes.length - 1;

        const squareIdx = this.calcSquareIdx(rowIdx, colIdx, puzzle.dim);
        this.square = square ? square : puzzle.squares[squareIdx]; 
        this.square.nodes.push(this);
        this.squareIdx = this.square.nodes.length - 1;

    }

    setup() {
        if (this.alreadySet) return;
        this.alreadySet = true;
        this.domNode = document.getElementById(`square${this.idx + 1}`)
        if (this.complete) {
            this.domNode.innerHTML = this.value;
            return;
        };
        const rowUsed = this.row.usedValues;
        const colUsed = this.col.usedValues;
        const squareUsed = this.square.usedValues;

        const cantUse = rowUsed.union(colUsed).union(squareUsed);
        for (let i = 1; i <= this.puzzle.dim; i++) {
            if (!cantUse.has(i)) this.possibles.add(i);
        }
    }

    calcSquareIdx(rowIdx, colIdx, dim) {
        const numSets = Math.sqrt(dim);
        const rowSet = Math.floor(rowIdx / numSets);
        const colSet = Math.floor(colIdx / numSets);


        return colSet + (rowSet * numSets);
    }

    setValue(value) {
        // TODO: integrate delay 
        // set value
        this.value = value;
        this.domNode.innerHTML = value;
        // for each row, col, and square
            // remove value from neededValues, add value to usedValues
            // iterate through nodes, remove value from possibles
        this.row.addValue(value);
        this.col.addValue(value);
        this.square.addValue(value);
        this.complete = true;
    }
}

export default SudokuNode;