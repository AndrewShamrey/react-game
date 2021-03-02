import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk, logger),
);

export default store;
