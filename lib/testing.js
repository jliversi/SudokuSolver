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



window.testInput = [4, 0, 0, 0, 
                    0, 0, 0, 3, 
                    2, 0, 0, 0, 
                    0, 0, 0, 2];

window.testInputFourHard = [1, 0, 0, 4, 
                            0, 0, 0, 0, 
                            0, 0, 3, 0, 
                            0, 0, 0, 0];

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

window.hardInput2    = [6,0,0,0,0,0,5,3,0,
                        0,0,0,0,0,2,7,0,0,
                        5,0,7,0,9,6,0,1,8,
                        0,0,6,0,0,1,0,8,0,
                        0,9,8,0,0,0,0,0,0,
                        0,0,0,0,2,0,0,0,0,
                        0,0,0,0,0,0,9,0,0,
                        0,0,0,2,0,0,0,4,3,
                        3,1,0,0,0,9,0,6,2];

window.hardInput3    = [0,0,1,0,3,0,0,5,0,
                        0,0,0,5,9,0,0,0,7,
                        0,7,0,0,0,0,1,0,6,
                        0,0,8,2,0,0,0,0,0,
                        5,3,0,0,0,0,0,1,8,
                        0,0,0,0,0,3,5,0,0,
                        2,0,4,0,0,0,0,7,0,
                        9,0,0,0,6,8,0,0,0,
                        0,6,0,0,2,0,8,0,0];

window.copyMeImBlank = [0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0,
                        0,0,0,0,0,0,0,0,0];



