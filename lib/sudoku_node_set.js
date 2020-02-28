

class SudokuNodeSet {
    constructor(puzzle, type, idx) {
        this.puzzle = puzzle;
        this.type = type;
        this.idx = idx;
        this.nodes = [];
    }

    setup() {
        // todo
        // create Set objects with currently existing values
        this.usedValues = new Set();
        this.neededValues = new Set();
        this.nodes.forEach(node => {
            if (node.value > 0) {
                usedValues.add(node.value);
            }
        });
        
    }
}