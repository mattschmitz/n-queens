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
 
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var logBoard = function(board) {
    console.log(JSON.stringify(board._currentAttributes));
  };

  // Create a recursive function that takes a board and a row counter
  var genBoards = function(row, board) {
    var newboard = board || new Board({n: n});

    if (row === n) {
      if (!newboard.hasAnyRowConflicts() && !newboard.hasAnyColConflicts()) {
        solutionCount++;
      }
      return;
    }

    for (var i = 0; i < n; i++) {
      newboard.togglePiece(row, i);
      genBoards(row + 1, newboard);
      newboard.togglePiece(row, i);
    }

  };

  genBoards(0);


  // var findSol = function(board, row) {
  //   debugger;
  //   logBoard();

  //   for (var col = 0; col < n; col++) { // Loop through from 0 to n and create n instances of board with one piece at i

  //     board.togglePiece(row, col); logBoard();

  //     if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) { // If there's a conflict, untoggle and return
  //       board.togglePiece(row, col); logBoard();
  //     } else if (row === n - 1) { // Else check if we've reached the end
  //       solutionCount++;
  //       return;
  //     } else { // If not, recall function passing in our current board and incremented row counter
  //       findSol(board, row + 1);
  //     }
  //   }

  // };

  // findSol(board, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  debugger;
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
