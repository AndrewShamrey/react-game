import "./App.css";
import BoardContainer from './containers/boardContainer';
import StatusContainer from './containers/statusContainer';
import SettingsContainer from './containers/settingContainer';

function App() {
  return (
    <div className="App">
      <h1 className="game__title">Minesweeper for React-game</h1>
      <SettingsContainer />
			<StatusContainer />
			<BoardContainer />
    </div>
  );
}

export default App;
