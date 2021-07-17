import checkForWinner from './checkForWinner';
var cloneDeep = require('lodash.clonedeep');

export default class MiniMaxAgent {
  constructor(grid_size) {
    this.grid_size = grid_size
  }
 async bestMove(board) {
    // AI to make its turn
    let bestScore = -100;
    let move;
    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        // Is the spot available?
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
  let hasWinner = checkForWinner(isMaximizing?'crosses': 'knots', board.length, board);
  if (hasWinner && !isMaximizing) {
    return 1;
  }
  else if(hasWinner){
    return -1
  }
  if(this.grid_size == 4 && depth == 3 || this.grid_size == 5 && depth == 2|| this.checkForTie(board)) return 0
  if (isMaximizing) {
    let bestScore = -100;
    for (let i = 0; i < this.grid_size; i++) {
      for (let j = 0; j < this.grid_size; j++) {
        // Is the spot available?
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
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board.length; j++){
        if(board[i][j] == null) return false
      }     
    }
    return true
  }
}


