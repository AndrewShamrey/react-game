import { SHOW_SETTINGS, HIDE_SETTINGS, SET_GAME, RESTART_GAME, UPDATE_ELAPSED_TIME, OPEN_CELL, ROTATE_CELL_STATE, HIDE_AUTH, SET_NAME, SHOW_RECORDS, HIDE_RECORDS, UPDATE_RECORDS, SELECT_BACK, SHOW_BACK_SETTING, HIDE_BACK_SETTING } from "../actionTypes/control";

export const showSettings = () => ({ type: SHOW_SETTINGS });
export const hideSettings = () => ({ type: HIDE_SETTINGS });
export const setGame = (width, height, mineCount, soundsVolume, musicVolume) => ({ type: SET_GAME, width, height, mineCount, soundsVolume, musicVolume });
export const restartGame = () => ({ type: RESTART_GAME });
export const updateElapsedTime = () => ({ type: UPDATE_ELAPSED_TIME });
export const openCell = (x, y) => ({ type: OPEN_CELL, x, y });
export const rotateCellState = (x, y) => ({ type: ROTATE_CELL_STATE, x, y });
export const hideAuth = () => ({ type: HIDE_AUTH });
export const setName = (name) => ({ type: SET_NAME, name });
export const showRecords = () => ({ type: SHOW_RECORDS });
export const hideRecords = () => ({ type: HIDE_RECORDS });
export const updateRecords = () => ({ type: UPDATE_RECORDS });
export const selectBack = (index) => ({ type: SELECT_BACK, index });
export const showBackSetting = () => ({ type: SHOW_BACK_SETTING });
export const hideBackSetting = () => ({ type: HIDE_BACK_SETTING });
