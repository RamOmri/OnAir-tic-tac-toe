import {
  ADD_COLUMN,
  SET_GRIDSIZE,
  SET_CURRENT_PLAYER,
  MODIFY_BOARD_MAP,
  SET_WINNER,
  RESET_GAME
} from './types';

const initState = {
  grid_size: 3,
  board_map: [],
  current_player: 'crosses',
  winner: null
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
    case SET_WINNER:
      return{
        ...state,
        winner: action.data
      }
    case RESET_GAME:
      return {...initState}

    default:
      return state;
  }
};

export default reducer;
