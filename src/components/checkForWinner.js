/*
Admittedly not the most efficient function, but given the limited number of cells being iterated over
this function performs sufficiently well. The function checks for the three possible winning series, vertical,
horizontal or vertical by looping over the board this many times. 
*/

 export default checkForWinner = (player, grid_size ,board_map) =>{
        let opponent = player == 'crosses' ? 'knots' : 'crosses'
        if(check_for_vertical_win(opponent, board_map, grid_size) == true) return true
       else if( check_for_horizontal_win(player, grid_size, board_map)) return true
       else if(check_for_diagonal_win(player, grid_size, board_map)) return true
       else return false
    
      }

      check_for_vertical_win = (opponent, board_map, grid_size) => {
        for(let i = 0; i < grid_size; i++){
          if(!board_map[i].includes(opponent) && !board_map[i].includes(null)){
            return true
          }
        }
        return false
      }
     check_for_horizontal_win = (player,grid_size, board_map) => {
        for(let i = 0; i < grid_size; i++){
          let streak = 0
          for(let  j = 0; j < grid_size; j++){
            if(player == board_map[j][i]) streak++
            else if (!null) break
          }
          if(streak == grid_size) return true
        }
        return false
      }
      
  check_for_diagonal_win = (player, grid_size, board_map) => {
        let streak = 0
          for(let j = 0; j < grid_size; j++){
            if(board_map[j][j] == player) streak++
            else if(!null) break
          }
          if(streak == grid_size) return true
          else streak = 0
          for(let i = 0; i < grid_size; i++){
            if(board_map[i][grid_size - 1 - i] == player) streak++
            else if(!null) break
          }
          if(streak == grid_size) return true
          else return false
      }
