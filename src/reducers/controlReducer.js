import produce from 'immer';
import * as ACTION_TYPES from '../actionTypes/control';
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES, GAME, CODES } from '../constants';
import { initBoard, expandOpenedCell, getNextCellCode, getFlagIncDec } from '../minesweeper';

const buildState = () => ({
	enableSettings: false,
	gameState: GAME.READY,
	enableTimer: false,
	elapsedTime: 0,
	boardData: initBoard(MIN_WIDTH, MIN_HEIGHT, MIN_MINES),
	width: MIN_WIDTH,
	height: MIN_HEIGHT,
	mineCount: MIN_MINES,
	flagCount: 0,
	openedCellCount: 0
});

const initialState = { ...buildState() };

const controlReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.SHOW_SETTINGS:
            return produce(state, draft => {
				draft.enableSettings = true;
			});
        case ACTION_TYPES.HIDE_SETTINGS:
            return produce(state, draft => {
				draft.enableSettings = false;
			});
        case ACTION_TYPES.SET_GAME:
            return produce(state, draft => {
				draft.width = action.width;
				draft.height = action.height;
				draft.mineCount = action.mineCount;
			});
        case ACTION_TYPES.RESTART_GAME:
            return produce(state, draft => {
				draft.gameState = GAME.READY;
				draft.enableTimer = false;
				draft.elapsedTime = 0;
				draft.boardData = initBoard(state.width, state.height, state.mineCount);
				draft.flagCount = 0;
				draft.openedCellCount = 0;
			});
        case ACTION_TYPES.UPDATE_ELAPSED_TIME:
            return produce(state, draft => {
				draft.elapsedTime++;
			});
        case ACTION_TYPES.OPEN_CELL:
            return produce(state, draft => {
				const code = state.boardData[action.y][action.x];
				draft.gameState = GAME.RUN;

				// Start timer if click on cell
				if (!state.enableTimer) {
					draft.enableTimer = true;
				}

				if (code === CODES.MINE) {
					draft.gameState = GAME.LOSE;
					draft.enableTimer = false;
				}
				else if (code === CODES.NOTHING) {
					const expandResult = expandOpenedCell(draft.boardData, action.x, action.y);
					draft.boardData = expandResult.boardData;
					draft.openedCellCount += expandResult.openedCellCount;

					// Win
					if (state.width * state.height - state.mineCount === draft.openedCellCount) {
						draft.gameState = GAME.WIN;
						draft.enableTimer = false;
					}
				}
			});
        case ACTION_TYPES.ROTATE_CELL_STATE:
			return produce(state, draft => {
				const code = state.boardData[action.y][action.x];

				if (code !== CODES.OPENED) {
					draft.boardData[action.y][action.x] = getNextCellCode(code);
					draft.flagCount += getFlagIncDec(code);
				}
			});
        default: 
            return state;
    }
}

export default controlReducer;
