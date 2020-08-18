import SudokuNodeSet from './sudoku_node_set';
import SudokuNode from './sudoku_node';
// TODO: remove this
var testingIdx = 1;

class SudokuPuzzle {
    constructor(input, isRec = false, nodeIdxToTry, valueToTry, parentUnusable, printOrder) {
        // input should be an array of integers
        this.input = input;
        this.snapshot = Array.from(input);
        this.noOptions = new Set();
        this.filledInThisRun = [];

        this.main = document.getElementById('main');
        this.solved = false;
        this.dim = Math.sqrt(input.length);
        this.rows = [];
        this.cols = [];
        this.squares = [];
        this.nodes = [];

        // TODO: Refactor all DOM logic into display class
        

        // stuff for recursive solve
        this.isRec = isRec;
        if (!this.isRec) {
            this.unusable = {};
            this.printOrder = [];
            for(let i = 0; i < input.length; i++) {
                this.unusable[i] = [];
            }
        } else {
            this.parentUnusable = parentUnusable;
            this.unusable = deepDupObjWithArrs(this.parentUnusable);
            this.nodeIdxToTry = nodeIdxToTry;
            this.valueToTry = valueToTry;
            this.printOrder = printOrder;
        }
        
        this.setup();
    }

    setup() {
        if (!this.isRec) {
            this.createGrid();
        }
        this.createSets();
        this.createNodes();

        this.setupNodeSets();
        this.setupNodes();
        this.setupNodeSetsPostNodes();
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
        // TODO, replace this with a heap which always maintains the row/col/square worth checking next
        
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
        // TODO REMOVE THIS
        // console.log(this.nodeIdxToTry);
        // console.log(this.valueToTry);
        // console.log(this.unusable);
        // if (this.isRec) {
        //     this.parentUnusable[this.nodeIdxToTry].push(this.valueToTry);
        //     return;
        // }


        let valueSet = true;
        
        while (valueSet && !this.solved) {
            valueSet = false;
            if (this.findContradiction()) {
                this.undoPrint();
                this.parentUnusable[this.nodeIdxToTry].push(this.valueToTry);

                return false;
            }

            this.eachNode((el, i) => {
                if (el.possibles.length === 1) {
                    valueSet = true;
                    el.possibles.forEach(val => el.setValue(val));
                }
            })

            

            
            // if NO new values on that run through, add logic to 
                // 1. dup the existing puzzle, try a particular input with only 2 options
                // 2. recursively see if this will lead to a solution
            this.determineSolved()
        }
        if (!valueSet) {
            // TODO remove this following comment
            // return "couldnt shallow solve"

            const unsolvedNodes = {};
            this.eachNode((el, i) => {
                if (!el.complete) unsolvedNodes[el.idx] = el.possibles;
            })
            let wasRecSolved = false;

           


            let nodesToTry = Object.keys(unsolvedNodes);
            for(let i = 0; !wasRecSolved && i < nodesToTry.length; i++) {
                const nodeIdxToTry = nodesToTry[i];
                const nodePossibles = unsolvedNodes[nodeIdxToTry];
                for(let j = 0; !wasRecSolved && j < nodePossibles.length; j++) {
                    const valueToTry = nodePossibles[j];
                    const newPuzzle = this.dup(nodeIdxToTry, valueToTry);
                    wasRecSolved = newPuzzle.solve();
                }               
            }
                // TODO: Remove this entire if statement?
                if(wasRecSolved && this.isRec) {
                    return true;
                } else if (this.isRec) {
                    return false;
                };

        }
        if(!this.isRec) {
            debugger
            this.printSolution(0);
        }
        
        return this.solved;
    }

    determineSolved() {
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            if (!node.complete) return;
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

    dup(nodeIdx, valueToTry) {
        const alteredInput = Array.from(this.snapshot);
        alteredInput[nodeIdx] = valueToTry;
        this.printOrder.push([nodeIdx, valueToTry]);
        const duped = new SudokuPuzzle(alteredInput, true, nodeIdx, valueToTry, this.unusable, this.printOrder);
        return duped;
    }

    undoPrint() {
        this.filledInThisRun.forEach(idx => {
            const currentNode = this.nodes[idx];
            currentNode.domNode.innerHTML = "";
            this.printOrder.push([idx, 0]);
        });
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

    printSolution(ms = 100) {
        // TODO remove this
        if(ms === 0) {
            while(this.printOrder.length > 0) {
                let idxAndValue = this.printOrder.pop();
                let idx = idxAndValue[0];
                let value = idxAndValue[1];
                let domEle = this.nodes[idx].domNode;
                domEle.innerHTML = value > 0 ? value : "";
            }
            return;
        }

        const idxAndValue = this.printOrder.pop();
        let idx = idxAndValue[0];
        let value = idxAndValue[1];
        const domEle = this.nodes[idx].domNode;
        domEle.innerHTML = value > 0 ? value : "";
        if (this.printOrder.length > 0) {
            setTimeout(this.printSolution.bind(this), ms);
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

function deepDupObjWithArrs(obj) {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        newObj[el] = Array.from(obj[el]);
    });
    return newObj;
}






window.SudokuPuzzle = SudokuPuzzle;
