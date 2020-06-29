class SudokuNodeSet {
    constructor(puzzle, type, idx) {
        this.puzzle = puzzle;
        this.type = type;
        this.idx = idx;
        this.nodes = [];
    }

    setup() {
        this.usedValues = new Set();
        this.neededValues = new Set();
        this.nodes.forEach(node => {
            if (node.value > 0) {
                this.usedValues.add(node.value);
            }
        });
        for (let i = 1; i < 10; i++) {
            if (!this.usedValues.has(i)) {
                this.neededValues.add(i);
            }        
        }
    }

    addValue(value) {
        this.usedValues.add(value);
        this.neededValues.delete(value);
        this.eachNode(el => el.possibles.delete(value));
    }

    eachNode(cb) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            cb(node, i);
        }
    }
}

export default SudokuNodeSet;