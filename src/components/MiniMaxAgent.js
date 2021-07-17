import checkForWinner from './checkForWinner';
var cloneDeep = require('lodash.clonedeep');
/*
  Implementation of the minimax algorithm inside a class using alpha beta pruning. 
  The board map stored in the redux store is passed to the best move function and used
  to simulate the game. 
*/

export default class MiniMaxAgent {
  constructor(grid_size) {
    this.grid_size = grid_size
  }
  bestMove(board) {
    /*
      First funciton called starts the minimax algorithm. Essentially a recursive depth first search. 
    */
    let bestScore = -100;
    let move;
    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        if (board[i][j] == null) {
         let newBoard = cloneDeep(board)
          newBoard[i].splice(j, 1, 'knots')
          let score = this.minimax(newBoard, 0, false, -100, 100);

          if (score > bestScore) {
           
            bestScore = score;
            move = {x: i,y: j };
          }
        }
      }
    }
    return move
  }
 minimax(board, depth, isMaximizing, alpha, beta) {
   /*
    Depth first search with alpha beta pruning
   */
  let hasWinner = checkForWinner(isMaximizing?'crosses': 'knots', board.length, board);
  if (hasWinner && !isMaximizing) {
    return 1;
  }
  else if(hasWinner){
    return -1
  }
  //Below depth is checked to make the time complexity of the algorithm more sufferable
  if(this.grid_size == 4 && depth == 4 || this.grid_size == 5 && depth == 3|| this.checkForTie(board)) return 0
  if (isMaximizing) {
    let bestScore = -100;
    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        // If bo
        if (board[i][j] == null) {
           let newBoard = cloneDeep(board)
          newBoard[i].splice(j, 1, 'knots')
          let score = this.minimax(newBoard, depth + 1, false, alpha, beta);
           bestScore = score > bestScore? score: bestScore
          alpha = bestScore > alpha ? bestScore : alpha 
          if (beta <= alpha) break

         
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = 100;
    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        // Is the spot available?
        if (board[i][j] == null) {
         let newBoard = cloneDeep(board)
          newBoard[i].splice(j, 1, 'crosses')
          
          let score = this.minimax(newBoard, depth + 1, true);
          bestScore = score < bestScore ? score : bestScore
          beta = bestScore < beta ? bestScore : beta
          if(beta <= alpha) break
        }
      }
    }
    return bestScore;
  }
}

  checkForTie(board){
    /*
      Given a board map checks whether all spaces are occupied. Does not check for wins only 
      for a terminal state
    */
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board.length; j++){
        if(board[i][j] == null) return false
      }     
    }
    return true
  }
}


