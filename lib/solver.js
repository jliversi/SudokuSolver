import SudokuNodeSet from './sudoku_node_set';
import SudokuNode from './sudoku_node';

class SudokuPuzzle {
    constructor(input, print = true, isRec = false) {
        // input should be an array of integers
        this.input = input;
        this.snapshot = Array.from(input);
        this.noOptions = new Set();

        this.main = document.getElementById('main');
        this.solved = false;
        this.dim = Math.sqrt(input.length);
        this.rows = [];
        this.cols = [];
        this.squares = [];
        this.nodes = [];
        this.setup(print);

    }

    setup(print) {
        if (print) {
            this.createGrid();
        }
        this.createSets();
        this.createNodes();

        this.setupNodeSets();
        this.setupNodes();
        this.setupNodeSetsPostNodes();
        // add initial render 
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
        for(let i = 0; i < (this.dim ** 2); i++) {
            const val = this.input[i];
            const newNode = new SudokuNode(this,val,i);
            this.nodes.push(newNode);
        }
    }

    setupNodeSets() {
        this.eachSet(set => set.setup());
    }

    setupNodeSetsPostNodes() {
        this.eachSet(set => set.postNodeSetup());
    }

    setupNodes() {
        this.eachNode(node => node.setup());
    }

    allSets() {
        // todo, replace this with a heap which always maintains the row/col/square worth checking next
        
        return this.rows.concat(this.cols).concat(this.squares);
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
            if (cb(node, i)) return;
        }
    }

    solve() {
        let valueSet = true;
        while (valueSet && !this.solved) {
            valueSet = false;
            this.eachNode((el, i) => {
                if (el.possibles.size === 1) {
                    valueSet = true;
                    el.possibles.forEach(val => el.setValue(val));
                }
            })

            if (this.findContradiction()) {
                return "contradiction";
            }

            
            // if NO new values on that run through, add logic to 
                // 1. dup the existing puzzle, try a particular input with only 2 options
                // 2. recursively see if this will lead to a solution
            this.determineSolved()
        }
        if (!valueSet) {
            const duped = this.dup();


            return "couldn't shallow solve";
        }
    }

    solveWithDelay(ms = 50) {
        // TODO: refactor this! (maybe?)
        this.solved = false;
        while (!this.solved) {
			let valueSet = false;
            this.eachNode((el, i) => {
                if (el.possibles.size === 1) {

                    valueSet = true;
                    el.possibles.forEach(val => el.setValue(val));
                    setTimeout(this.solveWithDelay.bind(this, ms), ms);
                    this.solved = true;
                    return true;
                }
            });
            this.determineSolved();
        }
    }

    determineSolved() {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            if (node.possibles.size > 0) return;
        }
        this.solved = true;
    }

    findContradiction() {
        let contractionFound = false;
        this.eachNode(el => {
            if (this.noOptions.has(el.idx) && el.value === 0) {
                contractionFound = true;
                return true;
            }
        })
        return contractionFound;
    }

    dup() {
        const duped = new SudokuPuzzle(this.snapshot, false);
        
    }

    initialRender() {

    }

    createGrid() {
        for (let i = 1; i <= this.dim; i++) {
            const row = document.createElement('ul');
            row.classList.add('row');
            row.id = `row${i}`;
            for (let j = 1; j <= this.dim; j++) {
                const square = document.createElement('li');
                square.classList.add('square');
                const id = j + ((i - 1) * this.dim);
                square.id = `square${id}`;
                row.appendChild(square);
            }
        this.main.appendChild(row);
        }
    }

}


Set.prototype.union = function(otherSet) {
    // TODO: refactor to allow in determinate # of sets
    const union = new Set(this);
    for (const ele of otherSet) {
        union.add(ele);
    }
    return union;
};







window.SudokuPuzzle = SudokuPuzzle;

window.testInput = [4, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 2];
window.testInputEasy = [0,8,0,0,0,7,0,0,1,
                        6,1,0,5,9,0,8,0,0,
                        2,0,0,0,0,3,6,4,0,
                        0,0,0,1,0,5,4,0,0,
                        0,0,0,0,6,0,2,0,8,
                        0,0,0,0,4,8,0,0,3,
                        0,7,0,4,0,1,9,0,2,
                        0,2,9,7,3,6,1,0,0,
                        0,6,1,9,0,2,0,7,4];

window.testInputMedium = [0,4,0,0,0,0,0,0,0,
                          0,0,8,0,6,4,0,9,1,
                          6,0,2,0,0,0,7,0,3,
                          0,6,7,0,0,0,3,0,0,
                          0,9,3,0,2,7,5,8,0,
                          0,0,0,6,0,3,0,0,9,
                          0,0,5,0,0,0,9,6,2,
                          2,7,0,0,0,0,0,1,0,
                          0,0,1,0,0,0,0,0,0];

window.testInputHard = [0,0,0,0,0,0,0,0,0,
                        0,0,0,5,0,4,0,0,0,
                        0,7,0,1,6,9,0,5,0,
                        0,6,0,0,0,0,0,3,0,
                        0,8,1,0,0,0,4,2,0,
                        0,0,9,4,0,8,5,0,0,
                        9,0,0,8,0,5,0,0,1,
                        0,1,0,0,0,0,0,7,0,
                        0,5,0,6,0,3,0,4,0];






window.copyMeImBlank = [0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0];


