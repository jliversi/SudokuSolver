function isSquare(num) {
    return num > 0 && Math.sqrt(num) % 1 === 0;
}

function createGrid(dimensions = 9) {
    const main = document.getElementById('main');
    for (let i = 1; i <= dimensions; i++) {
        const row = document.createElement('ul');
        row.classList.add('row');
        row.id = `row${i}`;
        for (let j = 1; j <= dimensions; j++) {
            const square = document.createElement('li');
            square.classList.add('square');
            const id = j + ((i-1)*9);
            square.id = `square${id}`;
            row.appendChild(square);
        }
        main.appendChild(row);
    }
}

// input.replace(/\n/g, "")