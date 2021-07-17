import {
  SET_GRIDSIZE,
  ADD_COLUMN,
  SET_CURRENT_PLAYER,
  MODIFY_BOARD_MAP,
  SET_WINNER,
  RESET_GAME,
  IS_AGAINST_ALG,
} from './types';

//set the grid size on the settings screen
export const set_gridsize = size => ({
  type: SET_GRIDSIZE,
  data: size,
});
//add cells to the board map
export const add_column = cells => ({
  type: ADD_COLUMN,
  data: cells,
});
//set which player is currently playing
export const set_current_player = player => ({
  type: SET_CURRENT_PLAYER,
  data: player,
});
//Update the map when someone makes a move
export const update_board_map = obj => ({
  type: MODIFY_BOARD_MAP,
  data: obj,
});
export const set_winner = winner => ({
  type: SET_WINNER,
  data: winner,
});
//Resets the store
export const reset_game = () => ({
  type: RESET_GAME,
});
//Determine whether or not the user is playing against the algorithm. 
export const set_is_against_alg = (isAlg) => ({
  type: IS_AGAINST_ALG,
  data: isAlg
});
