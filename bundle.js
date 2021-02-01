/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/display.js":
/*!************************!*\
  !*** ./lib/display.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _puzzle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./puzzle */ \"./lib/puzzle.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./lib/index.js\");\n\n\n\nclass SudokuDisplay {\n  constructor(mainEle, dim)  {\n    this.dim = dim;\n\n    this.mainEle = mainEle;\n    this.domSqrs = Array.from({length: dim}, ()=> []);\n    this.domRows = [];\n    this.createDOMGrid();\n  }\n\n  newPuzzle(input) {\n    if (this.mainEle.lastChild.tagName === 'P') {\n      this.mainEle.removeChild(this.mainEle.lastChild);\n    }\n    this.puzzle = new _puzzle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](input, this);\n    this.puzzle.setup();\n  }\n\n  createDOMGrid() {\n    this.mainEle.className = '';\n    this.mainEle.classList.add('main');\n    this.mainEle.classList.add(`grid-${this.dim}`);\n    for (let i = 0; i < this.dim; i++) {\n      const row = document.createElement('ul');\n      row.classList.add('row');\n      for (let j = 0; j < this.dim; j++) {\n        const square = document.createElement('li');\n        const squareInput = document.createElement('input');\n        squareInput.type = 'number';\n        squareInput.min = 1;\n        squareInput.max = this.dim;\n        squareInput.addEventListener('change', e => {\n          if (e.target.value > this.dim) {\n            e.target.value = this.dim;\n          }\n        });\n        square.appendChild(squareInput);\n        square.classList.add('square');\n        this.domSqrs[i][j] = squareInput;\n        row.appendChild(square);\n      }\n      this.domRows.push(row);\n      this.mainEle.appendChild(row);\n    }\n  }\n\n  dumpGrid()  {\n    while (this.mainEle.firstChild) {\n      this.mainEle.removeChild(this.mainEle.firstChild);\n    }\n  }\n\n  readInput() {\n    return this.domSqrs.map(row => {\n      return row.map(sqr => {\n        return sqr.value.length > 0 ? parseInt(sqr.value) : 0;\n      })\n    })\n  }\n\n  simplePrint() {\n    this.puzzle.grid.forEach((row,i) => {\n      row.forEach((val, j) => {\n        this.domSqrs[i][j].value = val > 0 ? val : '';\n      });\n    });\n  }\n\n  checkForBadInput() {\n    const broken = this.puzzle.findContradiction();\n    if (broken) {\n      const error = document.createElement('p');\n      error.innerHTML = 'Unsolvable from current input';\n      error.classList.add('error');\n      this.mainEle.appendChild(error);\n      const solveButton = document.getElementById('solve');\n      solveButton.innerHTML = 'Change an input to try again';\n\n      const _removeBadSqr = e => {\n\n        if (this.mainEle.lastChild.tagName === 'P') {\n          this.mainEle.removeChild(this.mainEle.lastChild);\n        }\n        solveButton.innerHTML = 'Solve';\n        solveButton.disabled = false;\n\n        broken.forEach(([x, y]) => {\n          const brokenSqr = this.domSqrs[x][y];\n          brokenSqr.classList.remove('bad-sqr');\n          brokenSqr.removeEventListener('change', _removeBadSqr);\n        })\n\n        document.querySelectorAll('button').forEach(button => {\n          button.removeEventListener('click', _removeBadSqr);\n        })\n      }\n\n      broken.forEach(([x,y]) => {\n        const brokenSqr = this.domSqrs[x][y];\n        brokenSqr.classList.add('bad-sqr');\n        brokenSqr.addEventListener('change', _removeBadSqr);\n      })\n      document.querySelectorAll('button').forEach(button => {\n        button.addEventListener('click', _removeBadSqr);\n      })\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  badPuzzle() {\n    const error = document.createElement('p');\n    error.innerHTML = 'Unsolvable from current input';\n    error.classList.add('error'); \n    this.mainEle.appendChild(error);\n    const solveButton = document.getElementById('solve');\n    solveButton.innerHTML = 'Change an input to try again'\n\n    const _removeBadPuzzle = e => {\n      if (this.mainEle.lastChild.tagName === 'P') {\n        this.mainEle.removeChild(this.mainEle.lastChild);\n      }\n      solveButton.innerHTML = 'Solve';\n      solveButton.disabled = false;\n      document.querySelectorAll('input').forEach(sqr => {\n        sqr.removeEventListener('change', _removeBadPuzzle);\n      })\n      document.querySelectorAll('button').forEach(button => {\n        button.removeEventListener('click', _removeBadPuzzle);\n      })\n    }\n    document.querySelectorAll('input').forEach(sqr => {\n      sqr.addEventListener('change', _removeBadPuzzle);\n    })\n    document.querySelectorAll('button').forEach(button => {\n      button.addEventListener('click', _removeBadPuzzle);\n    })\n    \n  }\n  \n  fancyPrint(sqrsToPrint) {\n    let ms = 0;\n    sqrsToPrint.forEach(([x,y], i) => {\n      const node = this.domSqrs[x][y];\n      const val = node.value;\n      if (val === \"\") {\n        setTimeout(() => {\n          const newVal = this.puzzle.grid[x][y];\n          node.value = newVal;\n          node.classList.add('content');\n\n          if (i === sqrsToPrint.length - 1) {\n\n            const solveButton = document.getElementById('solve');\n            solveButton.disabled = false;\n            solve.innerHTML = 'Reset';\n            solve.removeEventListener('click', _index__WEBPACK_IMPORTED_MODULE_1__[\"solveCurrent\"]);\n\n            document.querySelectorAll('button').forEach(button => {\n              button.addEventListener('click', _index__WEBPACK_IMPORTED_MODULE_1__[\"resetToSolve\"])\n            });\n          }\n\n\n        }, ms);\n        ms += 50;\n      }\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (SudokuDisplay);\n\n//# sourceURL=webpack:///./lib/display.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: solveCurrent, resetToSolve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"solveCurrent\", function() { return solveCurrent; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"resetToSolve\", function() { return resetToSolve; });\n/* harmony import */ var _sample_inputs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sample_inputs */ \"./lib/sample_inputs.js\");\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./display */ \"./lib/display.js\");\n\n\n\nconst inputDiv = document.getElementById('user-input');\n\n\n\n\nconst fourPuzzles = [\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input4_1\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input4_2\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input4_3\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input4_4\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input4_5\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"blank4\"]\n];\n\nconst ninePuzzles = [\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input9_1\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input9_2\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input9_3\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input9_4\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"input9_5\"],\n  _sample_inputs__WEBPACK_IMPORTED_MODULE_0__[\"blank9\"]\n];\n\nlet currentPuzzles = ninePuzzles;\nlet currentPuzzleIdx = 0;\nlet currentSize = 9;\n\n\n\nlet display = new _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"](inputDiv, currentSize);\ndisplay.newPuzzle(currentPuzzles[currentPuzzleIdx]);\n\n\nconst solveCurrent = e => {\n  e.target.disabled = true;\n  display.newPuzzle(display.readInput());\n  display.puzzle.solve();\n\n\n}\nconst resetToSolve = e => {\n  display.newPuzzle(currentPuzzles[currentPuzzleIdx]);\n  const solveButton = document.getElementById('solve');\n  solveButton.innerHTML = 'Solve';\n  solveButton.addEventListener('click', solveCurrent);\n  document.querySelectorAll('button').forEach(button => {\n    button.removeEventListener('click', resetToSolve)\n  });\n}\n\n// Solve button listener\ndocument.getElementById('solve').addEventListener('click', solveCurrent);\n\n// Set event listeners for switching main-display\ndocument.getElementById('set-four').addEventListener('click', e => {\n  if (currentSize === 4) {\n    return;\n  } else {\n    currentPuzzles = fourPuzzles;\n    currentSize = 4;\n    \n    document.querySelector('.selected-size').classList.remove('selected-size');\n    e.target.classList.add('selected-size');\n\n    display.dumpGrid();\n    display = new _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"](inputDiv, 4);\n    display.newPuzzle(currentPuzzles[currentPuzzleIdx]);\n    \n  }\n});\ndocument.getElementById('set-nine').addEventListener('click', e => {\n  if (currentSize === 9) {\n    return;\n  } else {\n    currentPuzzles = ninePuzzles;\n    currentSize = 9;\n    \n    document.querySelector('.selected-size').classList.remove('selected-size');\n    e.target.classList.add('selected-size');\n\n    display.dumpGrid();\n    display = new _display__WEBPACK_IMPORTED_MODULE_1__[\"default\"](inputDiv, 9);\n    display.newPuzzle(currentPuzzles[currentPuzzleIdx]);\n\n  }\n});\n\n// set event listeners to switch sample input\nfor(let i = 0; i < 6; i++) {\n  const button = document.getElementById(`set-sample-${i}`);\n  button.addEventListener('click', (e) => {\n    if (currentPuzzleIdx === i) {\n      return;\n    } else {\n      document.querySelector('.selected-sample').classList.remove('selected-sample');\n      e.target.classList.add('selected-sample');\n      \n      currentPuzzleIdx = i;\n      display.newPuzzle(currentPuzzles[currentPuzzleIdx]);\n    }\n  });\n}\n\n\n\n\n\n\n\n\n// // for testing\n// window.Puzzle = Puzzle;\n// window.a = new Puzzle(worstInput, document.getElementById('main'))\n\n\n\n//# sourceURL=webpack:///./lib/index.js?");

/***/ }),

/***/ "./lib/puzzle.js":
/*!***********************!*\
  !*** ./lib/puzzle.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./lib/util.js\");\n\n\nclass Puzzle {\n  constructor(input, display) {\n    // input should be an array of arrays of integers (0 for empty)\n    this.input = input;\n    this.grid = input.map(el => el.slice());\n    this.solved = false \n    this.dim = input.length\n\n    this.display = display;\n  }\n\n  setup() {\n    this.display.simplePrint();\n\n    this.setupSets();\n    this.setupSqrs();\n  }\n\n\n  setupSets() {\n    this.rows = Array.from({ length: this.dim }, (_,i) => {\n      return Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcMissingNums\"])(this.grid[i],this.dim);\n    });\n\n    this.cols = Array.from({ length: this.dim }, (_,i) => {\n      return Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcMissingNums\"])(this.grid.map(row => row[i]),this.dim);\n    });\n\n    this.boxes = Array.from({ length: this.dim }, (_,i) => {\n      const boxArr = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"boxIdxToPosArr\"])(i, this.dim).map(([x,y]) => this.grid[x][y]);\n      return Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcMissingNums\"])(boxArr,this.dim);\n    });\n  }\n\n  setupSqrs() {\n    this.possGrid = this.grid.map((row, i) => {\n      return row.map((val,j) => {\n        if (val > 0) {\n          return new Set();\n        }\n        const rowSet = this.rows[i];\n        const colSet = this.cols[j];\n        const boxSet = this.boxes[Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcBoxIdx\"])(i,j,this.dim)];\n        return Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"setIntersection\"])(rowSet, colSet, boxSet);\n      });\n    });\n  }\n\n  eachPos(cb) {\n    for (let i = 0; i < this.dim; i++) {\n      for (let j = 0; j < this.dim; j++) {\n        cb(i, j);\n      }\n    }\n  }\n\n  firstRun() {\n    let valueSet = true;\n    const filled = [];\n    while (valueSet) {\n      valueSet = false;\n      this.eachPos((x,y) => {\n        if (this.possGrid[x][y].size === 1) {\n          // unfortunately the easiest way to get first element in 1 ele set\n          const newVal = this.possGrid[x][y].values().next().value;\n          this.grid[x][y] = newVal;\n          filled.push([x,y]);\n          this.rows[x].delete(newVal);\n          this.cols[y].delete(newVal);\n          this.boxes[Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcBoxIdx\"])(x,y,this.dim)].delete(newVal);\n          valueSet = true;\n        }\n      });\n      this.setupSqrs();\n    }\n    return filled;\n  }\n\n  backtrack() {\n    const unsolved = [];\n    this.eachPos((x,y) => {\n      if (this.grid[x][y] === 0) unsolved.push([x,y]);\n    })\n    this.tryGrid = Array.from({length: this.dim}, () => Array.from({length: this.dim}, () => 0));\n    for (let i = 0; i < unsolved.length; i++) {\n      if (i < 0) {\n        return false;\n      }\n      const [x,y] = unsolved[i];\n      const valToTry = this.grid[x][y] + 1;\n\n      this.grid[x][y] = 0;\n      if (valToTry > this.dim) {\n        this.grid[x][y] = 0;\n        i -= 2;\n      } else if (this.ruleBreak(x,y,valToTry)) {\n        this.grid[x][y] = valToTry;\n        i -= 1;\n      } else {\n        this.grid[x][y] = valToTry;\n      }\n    }\n    return unsolved;\n  }\n\n  ruleBreak(x,y,val) {\n    const row = this.grid[x];\n    const col = this.grid.map(row => row[y]);\n    const box = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"boxIdxToPosArr\"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcBoxIdx\"])(x,y,this.dim), this.dim).map(([x, y]) => this.grid[x][y]);\n    if (row.includes(val) || col.includes(val) || box.includes(val)) {\n      return true;\n    } else {\n      return false \n    }\n  }\n\n  findContradiction() {\n    for (let i = 0; i < this.dim; i++) {\n      for (let j = 0; j < this.dim; j++) {\n        const sqr = this.grid[i][j];\n        if (sqr > 0) {\n          const row = this.rows[i];\n          for(let x = 0; x < this.dim; x++) {\n            if (x !== j) {\n              if (this.grid[i][x] === sqr) return [[i,j],[i,x]];\n            }\n          }\n          const col = this.cols[j];\n          for (let x = 0; x < this.dim; x++) {\n            if (x !== i) {\n              if (this.grid[x][j] === sqr) return [[i, j], [x, j]];\n            }\n          }\n          const box = Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"boxIdxToPosArr\"])(Object(_util__WEBPACK_IMPORTED_MODULE_0__[\"calcBoxIdx\"])(i, j, this.dim), this.dim);\n          for (let x = 0; x < this.dim; x++) {\n            const [_x, _y] = box[x];\n            if (i !== _x || j !== _y) {\n              if (this.grid[_x][_y] === sqr) return [[i, j], [_x, _y]];\n            }\n          }\n\n        }\n      }\n    }\n    return false;\n  }\n\n  solve() {\n    if (this.display.checkForBadInput()) {\n      return false;\n    }\n    const firstSolved = this.firstRun();\n    const neededBacktrack = this.backtrack();\n    if (neededBacktrack) {\n      this.display.fancyPrint(firstSolved.concat(neededBacktrack));\n    } else {\n      this.display.badPuzzle();\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Puzzle);\n\n//# sourceURL=webpack:///./lib/puzzle.js?");

/***/ }),

/***/ "./lib/sample_inputs.js":
/*!******************************!*\
  !*** ./lib/sample_inputs.js ***!
  \******************************/
/*! exports provided: input4_1, input4_2, input4_3, input4_4, input4_5, blank4, input9_1, input9_2, input9_3, input9_4, input9_5, blank9, worstInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input4_1\", function() { return input4_1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input4_2\", function() { return input4_2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input4_3\", function() { return input4_3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input4_4\", function() { return input4_4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input4_5\", function() { return input4_5; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blank4\", function() { return blank4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input9_1\", function() { return input9_1; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input9_2\", function() { return input9_2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input9_3\", function() { return input9_3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input9_4\", function() { return input9_4; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"input9_5\", function() { return input9_5; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"blank9\", function() { return blank9; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"worstInput\", function() { return worstInput; });\n\n\nconst input4_1 = [[4, 0, 0, 0], \n                         [0, 0, 0, 3], \n                         [2, 0, 0, 0], \n                         [0, 0, 0, 2]];\n\nconst input4_2 = [[2, 1, 0, 0], \n                         [0, 3, 2, 0], \n                         [0, 0, 0, 4], \n                         [1, 0, 0, 0]];\n\nconst input4_3 = [[3, 0, 0, 1], \n                         [1, 0, 0, 0], \n                         [0, 0, 0, 0], \n                         [0, 0, 2, 0]];\n\nconst input4_4 = [[4, 0, 0, 0], \n                         [0, 0, 4, 0], \n                         [0, 0, 0, 3], \n                         [0, 2, 0, 0]];\n\n\nconst input4_5 = [[1, 0, 0, 4], \n                            [0, 0, 0, 0], \n                            [0, 0, 3, 0], \n                            [0, 0, 0, 0]];\n\nconst blank4 = [[0,0,0,0],\n                      [0,0,0,0],\n                      [0,0,0,0],\n                      [0,0,0,0]];\n\n\nconst input9_1 = [[0,8,0,0,0,7,0,0,1],\n                        [6,1,0,5,9,0,8,0,0],\n                        [2,0,0,0,0,3,6,4,0],\n                        [0,0,0,1,0,5,4,0,0],\n                        [0,0,0,0,6,0,2,0,8],\n                        [0,0,0,0,4,8,0,0,3],\n                        [0,7,0,4,0,1,9,0,2],\n                        [0,2,9,7,3,6,1,0,0],\n                        [0,6,1,9,0,2,0,7,4]];\n\nconst input9_2 = [[0,4,0,0,0,0,0,0,0],\n                          [0,0,8,0,6,4,0,9,1],\n                          [6,0,2,0,0,0,7,0,3],\n                          [0,6,7,0,0,0,3,0,0],\n                          [0,9,3,0,2,7,5,8,0],\n                          [0,0,0,6,0,3,0,0,9],\n                          [0,0,5,0,0,0,9,6,2],\n                          [2,7,0,0,0,0,0,1,0],\n                          [0,0,1,0,0,0,0,0,0]];\n\nconst input9_3 = [[0,0,0,0,0,0,0,0,0],\n                        [0,0,0,5,0,4,0,0,0],\n                        [0,7,0,1,6,9,0,5,0],\n                        [0,6,0,0,0,0,0,3,0],\n                        [0,8,1,0,0,0,4,2,0],\n                        [0,0,9,4,0,8,5,0,0],\n                        [9,0,0,8,0,5,0,0,1],\n                        [0,1,0,0,0,0,0,7,0],\n                        [0,5,0,6,0,3,0,4,0]];\n\nconst input9_4 = [[6,0,0,0,0,0,5,3,0],\n                        [0,0,0,0,0,2,7,0,0],\n                        [5,0,7,0,9,6,0,1,8],\n                        [0,0,6,0,0,1,0,8,0],\n                        [0,9,8,0,0,0,0,0,0],\n                        [0,0,0,0,2,0,0,0,0],\n                        [0,0,0,0,0,0,9,0,0],\n                        [0,0,0,2,0,0,0,4,3],\n                        [3,1,0,0,0,9,0,6,2]];\n\nconst input9_5 = [[0,0,1,0,3,0,0,5,0],\n                        [0,0,0,5,9,0,0,0,7],\n                        [0,7,0,0,0,0,1,0,6],\n                        [0,0,8,2,0,0,0,0,0],\n                        [5,3,0,0,0,0,0,1,8],\n                        [0,0,0,0,0,3,5,0,0],\n                        [2,0,4,0,0,0,0,7,0],\n                        [9,0,0,0,6,8,0,0,0],\n                        [0,6,0,0,2,0,8,0,0]];\n\n\n\nconst blank9 = [[0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,0,0,0,0]];\n\nconst worstInput = [[0,0,0,0,0,0,0,0,0],\n                        [0,0,0,0,0,3,0,8,5],\n                        [0,0,1,0,2,0,0,0,0],\n                        [0,0,0,5,0,7,0,0,0],\n                        [0,0,4,0,0,0,1,0,0],\n                        [0,9,0,0,0,0,0,0,0],\n                        [5,0,0,0,0,0,0,7,3],\n                        [0,0,2,0,1,0,0,0,0],\n                        [0,0,0,0,4,0,0,0,9]];\n\n//# sourceURL=webpack:///./lib/sample_inputs.js?");

/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: calcBoxIdx, boxIdxToPosArr, setUnion, setIntersection, calcMissingNums */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcBoxIdx\", function() { return calcBoxIdx; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"boxIdxToPosArr\", function() { return boxIdxToPosArr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setUnion\", function() { return setUnion; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setIntersection\", function() { return setIntersection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcMissingNums\", function() { return calcMissingNums; });\nconst calcBoxIdx = (rowIdx, colIdx, dim) => {\n  const numSets = Math.sqrt(dim);\n  const rowSet = Math.floor(rowIdx / numSets);\n  const colSet = Math.floor(colIdx / numSets);\n\n  return colSet + (rowSet * numSets);\n};\n\nconst boxIdxToPosArr = (i, dim) => {\n  dim = Math.sqrt(dim);\n  const xOffset = Math.floor(i / dim) * dim;\n  const yOffset = (i % dim) * dim;\n  const result = [];\n  for (let i = xOffset; i < xOffset + dim; i++) {\n    for (let j = yOffset; j < yOffset + dim; j++) {\n      result.push([i,j]);\n    }\n  }\n  return result;\n}\n\nconst setUnion = (...sets) => {\n  const union = new Set();\n  for (const nextSet of sets) {\n    for (const ele of nextSet) {\n      union.add(ele);\n    }\n  }\n  return union;\n};\n\nconst setIntersection = (...sets) => {\n  let intersection = new Set(sets[0]);\n  for (const nextSet of sets.slice(1)) {\n    intersection = new Set([...nextSet].filter(x => intersection.has(x)))\n  }\n  return intersection;\n}\n\nconst calcMissingNums = (arr, len) => {\n  const result = new Set(Array.from({ length: len }, (_, i) => i + 1));\n  arr.forEach(el => result.delete(el));\n  return result;\n}\n\n//# sourceURL=webpack:///./lib/util.js?");

/***/ })

/******/ });