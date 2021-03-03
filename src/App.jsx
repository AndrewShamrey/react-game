import { useEffect } from "react";
import { useSelector } from "react-redux";
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
  const backIndex = useSelector((rootState) => rootState.control.backIndex);
  
  // useEffect(() => {
  //   if (width > 17 || height > 17) {
     
  //   }
  // }, [width, height]);

  const backgrounds = [back1, back2, back3, back4, back5];
  const style = { "backgroundImage": `url(${backgrounds[backIndex]})` };

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
// ? 7 Сохранение состояния игры в localStorage
// ?! 8 Автопроигрывание игры
