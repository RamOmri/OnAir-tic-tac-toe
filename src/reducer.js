import {SET_GRIDSIZE} from './types'

const initState = {
    grid_size : 3
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_GRIDSIZE:
      return {
        ...state,
        grid_size: action.data
    }
    default:
      return state;
  }
};

export default reducer;
