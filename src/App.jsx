import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrevState } from "./actions/control";
import "./App.css";
import AuthContainer from './containers/authContainer';
import BoardContainer from './containers/boardContainer';
import StatusContainer from './containers/statusContainer';
import SettingsContainer from './containers/settingContainer';
import RecordsContainer from './containers/recordsContainer';
import BackSettingContainer from './containers/backSettingContainer';

import back1 from "./assets/images/back1.jpg";
import back2 from "./assets/images/back2.png";
import back3 from "./assets/images/back3.jpg";
import back4 from "./assets/images/back4.jpg";
import back5 from "./assets/images/back5.png";

function App() {
  const dispatch = useDispatch();
  const backIndex = useSelector((rootState) => rootState.control.backIndex);
  const gamerName = useSelector((rootState) => rootState.control.gamerName);
  const gameState = useSelector((rootState) => rootState.control.gameState);
  const elapsedTime = useSelector((rootState) => rootState.control.elapsedTime);
  const boardData = useSelector((rootState) => rootState.control.boardData);
  const width = useSelector((rootState) => rootState.control.width);
  const height = useSelector((rootState) => rootState.control.height);
  const mineCount = useSelector((rootState) => rootState.control.mineCount);
  const soundsVolume = useSelector((rootState) => rootState.control.soundsVolume);
  const musicVolume = useSelector((rootState) => rootState.control.musicVolume);
  const flagCount = useSelector((rootState) => rootState.control.flagCount);
  const openedCellCount = useSelector((rootState) => rootState.control.openedCellCount);
  
  const backgrounds = [back1, back2, back3, back4, back5];
  const style = { "backgroundImage": `url(${backgrounds[backIndex]})` };
  
  const handleUnload = useCallback(() => {
    const gameConfig = { backIndex, gamerName, gameState, elapsedTime, boardData, width, height, mineCount, soundsVolume, musicVolume, flagCount, openedCellCount }
    localStorage.setItem('currentGameConfig', JSON.stringify(gameConfig));
  }, [backIndex, gamerName, gameState, elapsedTime, boardData, width, height, mineCount, soundsVolume, musicVolume, flagCount, openedCellCount]);

  const handleLoad = useCallback(() => {
    const prevState = JSON.parse(localStorage.getItem('currentGameConfig'));
    dispatch(setPrevState(prevState));
  }, []);

  useEffect(() => {
    window.addEventListener('load', handleLoad);
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleLoad, handleUnload]);

  return (
    <div className="App" style={style}>
      <h1 className="game__title">Minesweeper for React-game</h1>
      <AuthContainer />
      <SettingsContainer />
			<StatusContainer />
			<BoardContainer />
      <RecordsContainer />
      <BackSettingContainer />
    </div>
  );
}

export default App;

// 4 Горячие клавиши
// ?! 8 Автопроигрывание игры
