import {
  ADD_COLUMN,
  SET_GRIDSIZE,
  SET_CURRENT_PLAYER,
  MODIFY_BOARD_MAP,
} from './types';

const initState = {
  grid_size: 3,
  board_map: [],
  current_player: 'crosses',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GRIDSIZE:
      return {
        ...state,
        grid_size: action.data,
      };
    case ADD_COLUMN:
      return {
        ...state,
        board_map: [...state.board_map, action.data],
      };
    case SET_CURRENT_PLAYER:
      return {
        ...state,
        current_player: action.data,
      };
    case MODIFY_BOARD_MAP:
      let obj = action.data;
      
      const newBoard_map = [...state.board_map];
      newBoard_map[obj.x].splice(obj.y, 1, obj.val);
      return {
        ...state,
        board_map: newBoard_map,
      };

    default:
      return state;
  }
};

export default reducer;
