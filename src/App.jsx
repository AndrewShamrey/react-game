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


// ? 1 Аудио сопровождение нажатий (+ насторйки звука)
// ? 2 Дизайн (+ изменение размеров клетки в зависимости от высоты)
// ? 3 Нажатие на поле с цифрой 
// ? 4 Горячие клавиши
// ? 5 Авторизация
// ? 6 Сохранение рекордов в базе 
// ? 7 Сохранение состояния игры в localStorage
// ? 8 Автопроигрывание игры
