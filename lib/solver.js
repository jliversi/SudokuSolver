class SudokuPuzzle {
    constructor(input) {
        // input should be an array of integers
        this.dim = Math.sqrt(input.length);
        this.input = input;
        this.rows = [];
        this.cols = []
        this.squares = [];
        this.nodes = [];
        this.setup();
    }

    setup() {
        this.createSets();
        this.createNodes();

        this.setupNodeSets();
        this.setupNodes();
    }

    createSets() {
        for (let i = 0; i < this.dim; i++) {
            const row = new SudokuNodeSet(this, "row", i);
            const col = new SudokuNodeSet(this, "col", i);
            const square = new SudokuNodeSet(this, "square", i);
            this.rows.push(row);
            this.cols.push(col);
            this.squares.push(square);
        }
    }

    createNodes() {
        for(let i = 0; i < this.dim**2; i++) {
            const val = this.input[i];
            const newNode = new SudokuNode(this,val,i);
            this.nodes.push(newNode);
        }
    }

    setupNodeSets() {
        this.eachSet(set => set.setup());
    }

    setupNodes() {
        this.eachNode(node => node.setup());
    }

    allSets() {
        this.rows.concat(this.cols).concat(this.squares);
    }

    eachSet(cb) {
        const allSets = this.allSets();
        for (let i = 0; i < allSets.length; i++) {
            const set = allSets[i];
            cb(set, i);
        }
    }

    eachNode(cb) {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            cb(node, i);
        }
    }


}





Set.prototype.union = function(otherSet) {
    const union = new Set(this);
    for(let ele of otherSet) {
        union.add(ele);
    }
    return union;
};