import "./App.css";
import AuthContainer from './containers/authContainer';
import BoardContainer from './containers/boardContainer';
import StatusContainer from './containers/statusContainer';
import SettingsContainer from './containers/settingContainer';
import RecordsContainer from './containers/recordsContainer';

function App() {
  return (
    <div className="App">
      <h1 className="game__title">Minesweeper for React-game</h1>
      <AuthContainer />
      <SettingsContainer />
			<StatusContainer />
			<BoardContainer />
      <RecordsContainer />
    </div>
  );
}

export default App;


// 4 Горячие клавиши
// ? 7 Сохранение состояния игры в localStorage
// ?! 8 Автопроигрывание игры
