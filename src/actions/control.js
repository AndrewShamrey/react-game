import { SHOW_SETTINGS, HIDE_SETTINGS, SET_GAME, RESTART_GAME, UPDATE_ELAPSED_TIME, OPEN_CELL, ROTATE_CELL_STATE } from "../actionTypes/control";

export const showSettings = () => ({ type: SHOW_SETTINGS });
export const hideSettings = () => ({ type: HIDE_SETTINGS });
export const setGame = (width, height, mineCount) => ({ type: SET_GAME, width, height, mineCount });
export const restartGame = () => ({ type: RESTART_GAME });
export const updateElapsedTime = () => ({ type: UPDATE_ELAPSED_TIME });
export const openCell = (x, y) => ({ type: OPEN_CELL, x, y });
export const rotateCellState = (x, y) => ({ type: ROTATE_CELL_STATE, x, y });
