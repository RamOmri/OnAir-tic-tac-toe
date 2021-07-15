import { SET_GRIDSIZE, ADD_COLUMN, SET_CURRENT_PLAYER, MODIFY_BOARD_MAP } from "./types";

export const set_gridsize = (size) => ({
    type: SET_GRIDSIZE,
    data: size,
  });
  export const add_column = (cells) => ({
    type: ADD_COLUMN,
    data: cells,
  });
  export const set_current_player = (player)=>({
    type: SET_CURRENT_PLAYER,
    data: player
  })
  export const update_board_map = (obj)=>({
    type: MODIFY_BOARD_MAP,
    data: obj
  })

