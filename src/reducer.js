import { stat } from 'fs';
import {ADD_COLUMN, SET_GRIDSIZE} from './types'

const initState = {
    grid_size : 3,
    board_map: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GRIDSIZE:
      return {
        ...state,
        grid_size: action.data
    }
    case ADD_COLUMN:
      return {
        ...state,
        board_map: [...state.board_map, action.data]
    }
    default:
      return state;
  }
};

export default reducer;
