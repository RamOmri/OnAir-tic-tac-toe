import { SET_GRIDSIZE, ADD_COLUMN } from "./types";

export const set_gridsize = (size) => ({
    type: SET_GRIDSIZE,
    data: size,
  });
  export const add_column = (cells) => ({
    type: ADD_COLUMN,
    data: cells,
  });