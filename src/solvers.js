/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var n = 4;
  var solution = [];
  // Create a new board to attempt combinations
  var board = new Board({n: n});
  // Start at 0,0
  //debugger;
  var counter = 0;

  var findSol = function(board, start) {   
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        board.togglePiece(i, j);
        if (board.hasRowConflictAt(i) || board.hasColConflictAt(j) || (i === 0 && j < start)) {
          board.togglePiece(i, j);
        } else {
          counter++;
        }
      }
    }
  };

  findSol(board, 2);

  //if board doesn't pass (i.e. if counter is <n)
    //counter = 0;
    //finsSol(board, different starting postion);

  //push to solution

  // Create solution matrix
  for (var i = 0; i < n; i++) {
    // Push every row in board to solution
    solution.push(board.get(i));
  }

  debugger;
  // Print solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // Return solution matrix
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
