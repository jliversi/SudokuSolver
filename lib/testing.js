function isSquare(num) {
    return num > 0 && Math.sqrt(num) % 1 === 0;
}

function createInputGrid(dimensions = 9) {
    const inputDiv = document.getElementById('inputDiv');
    for (let i = 1; i <= dimensions; i++) {
        const row = document.createElement('ul');
        row.classList.add('row');
        row.id = `row${i}`;
        for (let j = 1; j <= dimensions; j++) {
            const square = document.createElement('li');
            const squareInput = document.createElement('input');
            square.appendChild(squareInput);
            square.classList.add('square');
            const id = j + ((i-1)*9);
            square.id = `inputSquare${id}`;
            row.appendChild(square);
        }
        inputDiv.appendChild(row);
    }
}

function readInput() {
    const inputArr = [];
    const inputEle = document.getElementById('inputDiv');
    const rowUls = inputEle.children;
    for(let rowIdx = 0; rowIdx < rowUls.length; rowIdx++) {
        const rowEle = rowUls[rowIdx];
        const squareLis = rowEle.children;
        for(let squareIdx = 0; squareIdx < squareLis.length; squareIdx++) {
            const squareInput = squareLis[squareIdx].children[0];
            const squareValue = squareInput.value ? parseInt(squareInput.value) : 0;
            inputArr.push(squareValue);
        }
    }
    window.puzzle = new SudokuPuzzle(inputArr)
}

// createInputGrid(9);

// input.replace(/\n/g, "")