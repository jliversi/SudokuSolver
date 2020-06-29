SudokuSolver

Solver class
    initialize takes in game as string (or object from json)
    Stores sets, keeps reference to which ones have the most solved

nodeSet Class
    represents a set of a row, column, or square
    holds reference to each node inside 

node Class
    represents a node
    holds reference to nodeSets its part of
    holds reference to own value or possible values