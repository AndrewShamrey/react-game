import produce from "immer";
import * as ACTION_TYPES from "../actionTypes/control";
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES, GAME, CODES, MAX_VOLUME } from "../utils/constants";
import { initBoard, expandOpenedCell, getNextCellCode, getFlagIncDec } from "../utils/minesweeper";
import fetchData from "../utils/fetchData";

import bomb from "../assets/audio/bomb.wav";
import flag from "../assets/audio/flag.wav";
import click from "../assets/audio/click.wav";
import question from "../assets/audio/question.wav";
import hlup from "../assets/audio/hlup.wav";
import open from "../assets/audio/open.wav";
import start from "../assets/audio/start.wav";
import system from "../assets/audio/system.wav";
import success from "../assets/audio/success.wav";
import failed from "../assets/audio/failed.wav";
import relax from "../assets/audio/relax.wav";

const relaxAudio = new Audio(relax);
relaxAudio.loop="loop";

const buildState = () => ({
  enableAuth: true,
  gamerName: "",
  enableRecords: false,
  enableSettings: false,
  enableBackSetting: false,
  needToUpdateRecords: false,
  backIndex: 1,
  gameState: GAME.READY,
  enableTimer: false,
  elapsedTime: 0,
  boardData: initBoard(MIN_WIDTH, MIN_HEIGHT, MIN_MINES),
  width: MIN_WIDTH,
  height: MIN_HEIGHT,
  mineCount: MIN_MINES,
  soundsVolume: MAX_VOLUME / 2,
  musicVolume: MAX_VOLUME / 2,
  flagCount: 0,
  openedCellCount: 0,
  gameWin: false,
  gameLose: false,
});

const initialState = { ...buildState() };

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.HIDE_AUTH:
      return produce(state, (draft) => {
        draft.enableAuth = false;
        draft.needToUpdateRecords = true;
      });
    case ACTION_TYPES.SET_NAME:
      return produce(state, (draft) => {
        draft.gamerName = action.name;
      });
    case ACTION_TYPES.SHOW_RECORDS:
      return produce(state, (draft) => {
        draft.enableRecords = true;
        draft.enableSettings = false;
      });
    case ACTION_TYPES.HIDE_RECORDS:
      return produce(state, (draft) => {
        draft.enableRecords = false;
        draft.enableSettings = true;
      });
    case ACTION_TYPES.UPDATE_RECORDS:
      return produce(state, (draft) => {
        draft.needToUpdateRecords = false;
      });
    case ACTION_TYPES.SELECT_BACK:
      return produce(state, (draft) => {
        draft.backIndex = action.index;
      });
    case ACTION_TYPES.SHOW_BACK_SETTING:
      return produce(state, (draft) => {
        draft.enableBackSetting = true;
        draft.enableSettings = false;
      });
    case ACTION_TYPES.HIDE_BACK_SETTING:
      return produce(state, (draft) => {
        draft.enableBackSetting = false;
        draft.enableSettings = true;
      });
    case ACTION_TYPES.SHOW_SETTINGS:
      return produce(state, (draft) => {
        const systemAudio = new Audio(system);
        systemAudio.volume = state.soundsVolume / 100;
        systemAudio.play();
        draft.enableSettings = true;
        draft.enableTimer = false;
      });
    case ACTION_TYPES.HIDE_SETTINGS:
      return produce(state, (draft) => {
        draft.enableSettings = false;
        draft.enableTimer = true;
      });
    case ACTION_TYPES.SET_PREV_STATE:
      return produce(state, (draft) => {
        draft.backIndex = action.prevState.backIndex;
        draft.gamerName = action.prevState.gamerName;
        draft.gameState = action.prevState.gameState;
        draft.elapsedTime = action.prevState.elapsedTime;
        draft.boardData = action.prevState.boardData;
        draft.width = action.prevState.width;
        draft.height = action.prevState.height;
        draft.mineCount = action.prevState.mineCount;
        draft.soundsVolume = action.prevState.soundsVolume;
        draft.musicVolume = action.prevState.musicVolume;
        draft.flagCount = action.prevState.flagCount;
        draft.openedCellCount = action.prevState.openedCellCount;
      });
    case ACTION_TYPES.SET_GAME:
      return produce(state, (draft) => {
        draft.width = action.width;
        draft.height = action.height;
        draft.mineCount = action.mineCount;
        draft.soundsVolume = action.soundsVolume;
        draft.musicVolume = action.musicVolume;
      });
    case ACTION_TYPES.RESTART_GAME:
      return produce(state, (draft) => {
        relaxAudio.pause();
        const restartAudio = new Audio(start);
        restartAudio.volume = state.soundsVolume / 100;
        restartAudio.play();
        draft.gameState = GAME.READY;
        draft.enableTimer = false;
        draft.elapsedTime = 0;
        draft.boardData = initBoard(state.width, state.height, state.mineCount);
        draft.flagCount = 0;
        draft.openedCellCount = 0;
      });
    case ACTION_TYPES.UPDATE_ELAPSED_TIME:
      return produce(state, (draft) => {
        draft.elapsedTime++;
      });
    case ACTION_TYPES.SET_RESULT_FALSE:
      return produce(state, (draft) => {
        draft.gameWin = false;
        draft.gameLose = false;
      });
    case ACTION_TYPES.OPEN_CELL:
      return produce(state, (draft) => {
        const code = state.boardData[action.y][action.x];
        draft.gameState = GAME.RUN;
        if (!state.enableTimer) {
          if (relaxAudio.paused) {
            relaxAudio.volume = state.musicVolume / 100;
            relaxAudio.play();
          }
          draft.enableTimer = true;
        }
        let audio;
        switch (code) {
          case CODES.MINE:
            audio = new Audio(bomb);
            break;
          case CODES.NOTHING:
            audio = new Audio(open);
            break;
          default:
            audio = new Audio(click);
        }  
        audio.volume = state.soundsVolume / 100;
        audio.play();

        if (code === CODES.MINE) {
          draft.gameLose = true;
          relaxAudio.pause();
          const loseAudio = new Audio(failed);
          loseAudio.volume = state.soundsVolume / 100;
          loseAudio.play();
          draft.gameState = GAME.LOSE;
          draft.enableTimer = false;
        } else if (code === CODES.NOTHING) {
          const expandResult = expandOpenedCell(draft.boardData, action.x, action.y);
          draft.boardData = expandResult.boardData;
          draft.openedCellCount += expandResult.openedCellCount;
          if (state.width * state.height - state.mineCount === draft.openedCellCount) {
            draft.gameWin = true;
            relaxAudio.pause();
            const winAudio = new Audio(success);
            winAudio.volume = state.soundsVolume / 100;
            winAudio.play();
            const newGamer = { name: state.gamerName, time: state.elapsedTime, bombs: state.mineCount }
            fetchData("POST", null, JSON.stringify(newGamer))
              .catch((e) => console.log(e));
            draft.gameState = GAME.WIN;
            draft.enableTimer = false;
            draft.needToUpdateRecords = true
          }
        }
      });
    case ACTION_TYPES.ROTATE_CELL_STATE:
      return produce(state, (draft) => {
        const code = state.boardData[action.y][action.x];
        if (!state.enableTimer) {
          if (relaxAudio.paused) {
            relaxAudio.volume = state.musicVolume / 100;
            relaxAudio.play();
          }
          draft.enableTimer = true;
        }
        let audio;
        if (code >= 0) {
          audio = new Audio(click);
        } else {
          switch (code) {
            case CODES.MINE_FLAG:
            case CODES.FLAG:
              audio = new Audio(question);
              break;
            case CODES.MINE_QUESTION:
            case CODES.QUESTION:
              audio = new Audio(hlup);
              break;
            default:
              audio = new Audio(flag);
          }
        }
        audio.volume = state.soundsVolume / 100;
        audio.play();

        if (code !== CODES.OPENED) {
          draft.boardData[action.y][action.x] = getNextCellCode(code);
          draft.flagCount += getFlagIncDec(code);
        }
      });
    default:
      return state;
  }
};

export default controlReducer;
