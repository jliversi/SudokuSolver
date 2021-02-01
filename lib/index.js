import * as SampleInputs from './sample_inputs';
import Display from './display';

const inputDiv = document.getElementById('user-input');




const fourPuzzles = [
  SampleInputs.input4_1,
  SampleInputs.input4_2,
  SampleInputs.input4_3,
  SampleInputs.input4_4,
  SampleInputs.input4_5,
  SampleInputs.blank4
];

const ninePuzzles = [
  SampleInputs.input9_1,
  SampleInputs.input9_2,
  SampleInputs.input9_3,
  SampleInputs.input9_4,
  SampleInputs.input9_5,
  SampleInputs.blank9
];

let currentPuzzles = ninePuzzles;
let currentPuzzleIdx = 0;
let currentSize = 9;



let display = new Display(inputDiv, currentSize);
display.newPuzzle(currentPuzzles[currentPuzzleIdx]);


export const solveCurrent = e => {
  e.target.disabled = true;
  display.newPuzzle(display.readInput());
  display.puzzle.solve();


}
export const resetToSolve = e => {
  display.newPuzzle(currentPuzzles[currentPuzzleIdx]);
  const solveButton = document.getElementById('solve');
  solveButton.innerHTML = 'Solve';
  solveButton.addEventListener('click', solveCurrent);
  document.querySelectorAll('button').forEach(button => {
    button.removeEventListener('click', resetToSolve)
  });
}

// Solve button listener
document.getElementById('solve').addEventListener('click', solveCurrent);

// Set event listeners for switching main-display
document.getElementById('set-four').addEventListener('click', e => {
  if (currentSize === 4) {
    return;
  } else {
    currentPuzzles = fourPuzzles;
    currentSize = 4;
    
    document.querySelector('.selected-size').classList.remove('selected-size');
    e.target.classList.add('selected-size');

    display.dumpGrid();
    display = new Display(inputDiv, 4);
    display.newPuzzle(currentPuzzles[currentPuzzleIdx]);
    
  }
});
document.getElementById('set-nine').addEventListener('click', e => {
  if (currentSize === 9) {
    return;
  } else {
    currentPuzzles = ninePuzzles;
    currentSize = 9;
    
    document.querySelector('.selected-size').classList.remove('selected-size');
    e.target.classList.add('selected-size');

    display.dumpGrid();
    display = new Display(inputDiv, 9);
    display.newPuzzle(currentPuzzles[currentPuzzleIdx]);

  }
});

// set event listeners to switch sample input
for(let i = 0; i < 6; i++) {
  const button = document.getElementById(`set-sample-${i}`);
  button.addEventListener('click', (e) => {
    if (currentPuzzleIdx === i) {
      return;
    } else {
      document.querySelector('.selected-sample').classList.remove('selected-sample');
      e.target.classList.add('selected-sample');
      
      currentPuzzleIdx = i;
      display.newPuzzle(currentPuzzles[currentPuzzleIdx]);
    }
  });
}








// // for testing
// window.Puzzle = Puzzle;
// window.a = new Puzzle(worstInput, document.getElementById('main'))

