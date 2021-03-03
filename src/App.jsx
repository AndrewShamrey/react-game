import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPrevState, setResultFalse } from "./actions/control";
import "./App.css";

import AuthContainer from './containers/authContainer';
import BoardContainer from './containers/boardContainer';
import StatusContainer from './containers/statusContainer';
import SettingsContainer from './containers/settingContainer';
import RecordsContainer from './containers/recordsContainer';
import BackSettingContainer from './containers/backSettingContainer';

import winImage from "./assets/images/win.gif";
import loseImage from "./assets/images/lose.gif";
import back1 from "./assets/images/back1.jpg";
import back2 from "./assets/images/back2.png";
import back3 from "./assets/images/back3.jpg";
import back4 from "./assets/images/back4.jpg";
import back5 from "./assets/images/back5.png";

function App() {
  const dispatch = useDispatch();
  const backIndex = useSelector((rootState) => rootState.control.backIndex);
  const gameWin = useSelector((rootState) => rootState.control.gameWin);
  const gameLose = useSelector((rootState) => rootState.control.gameLose);
  const currentState =  useSelector((rootState) => rootState.control);
  
  const backgrounds = [back1, back2, back3, back4, back5];
  const style = { "backgroundImage": `url(${backgrounds[backIndex]})` };

  const handleUnload = useCallback(() => {
    localStorage.setItem('currentGameConfig', JSON.stringify(currentState));
  }, [currentState]);

  const handleLoad = useCallback(() => {
    const prevState = JSON.parse(localStorage.getItem('currentGameConfig'));
    dispatch(setPrevState(prevState));
  }, []);

  useEffect(() => {
    if (gameWin || gameLose) {
      setTimeout(handleEndImage, 2000);
    }
    window.addEventListener('load', handleLoad);
    window.addEventListener('unload', handleUnload);
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('unload', handleUnload);
    };
  }, [handleLoad, handleUnload, gameWin, gameLose]);

  const handleEndImage = useCallback(() => {
    dispatch(setResultFalse());
  }, []);

  return (
    <div className="App" style={style}>
      {gameWin && <img className="game-result-image" src={winImage} alt="win" />}
      {gameLose && <img className="game-result-image" src={loseImage} alt="win" />}
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
