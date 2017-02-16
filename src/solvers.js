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
  var solution = [];

  var findSol = function(start) {

    if (start >= n) {
      return undefined;
    }

    var board = new Board({n: n});   
    var counter = 0;

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

    if (counter === n) {
      return board;
    } else {
      return findSol(start + 1);
    }

  };

  var solBoard = findSol(0);
  //push to solution

  // Create solution matrix
  for (var i = 0; i < n; i++) {
    // Push every row in board to solution
    solution.push(solBoard.get(i));
  }

  // Print solution
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  // Return solution matrix
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  
  var genBoards = function(row, board) {
    if (row === n) {
      //board.log();

      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(i)) {
        genBoards(row + 1, board);
      }
      board.togglePiece(row, i);
    }
  };
  genBoards(0, new Board({n: n})); 

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme

  var genBoards = function(row, board) {
    if (row === n) {
      solution.push(board.duplicate());
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      var indexMajD = board._getFirstRowColumnIndexForMajorDiagonalOn(row, i);
      var indexMinD = board._getFirstRowColumnIndexForMinorDiagonalOn(row, i);

      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(i) 
          && !board.hasMajorDiagonalConflictAt(indexMajD) && !board.hasMinorDiagonalConflictAt(indexMinD)) {
        genBoards(row + 1, board);
      } 
      board.togglePiece(row, i);
    }
  };

  genBoards(0, new Board({n: n}));

  // We need to return a matrix so we will take our first solution and break it up into a matrix
  var oneSol = [];
  if (solution[0]) {
    oneSol = solution[0].duplicateMatrix();
  } else { //no solutions - return empty matrix of size n
    var blank = new Board({n: n });
    oneSol = blank.duplicateMatrix();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(oneSol));
  return oneSol;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 
  
  var genBoards = function(row, board) {
    if (row === n) {
      //board.log();
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      var indexMajD = board._getFirstRowColumnIndexForMajorDiagonalOn(row, i);
      var indexMinD = board._getFirstRowColumnIndexForMinorDiagonalOn(row, i);

      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(i) 
          && !board.hasMajorDiagonalConflictAt(indexMajD) && !board.hasMinorDiagonalConflictAt(indexMinD)) {
        genBoards(row + 1, board);
      }
      board.togglePiece(row, i);
    }
  };
  genBoards(0, new Board({n: n})); 

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
