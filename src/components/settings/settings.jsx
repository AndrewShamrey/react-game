import { MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MIN_MINES, MIN_VOLUME, MAX_VOLUME } from "../../utils/constants";
import "./settings.css";

const Settings = ({ width, height, mineCount, maxMineCount, soundsVolume, musicVolume, onChangeWidth, onChangeHeight, onChangeMines, onChangeSoundsVolume, onChangeMusicVolume, onClickRecords, onClickSet }) => {
  return (
    <div className="settings-wrapper">
      <div className="settings-wrapper__item">
        <p className="settings-item__title">Width: {width}</p>
        <input className="settings-input" type="range" min={MIN_WIDTH} max={MAX_WIDTH} value={width} onChange={onChangeWidth} />
      </div>
      <div className="settings-wrapper__item">
        <p className="settings-item__title">Height: {height}</p>
        <input className="settings-input" type="range" min={MIN_HEIGHT} max={MAX_HEIGHT} value={height} onChange={onChangeHeight} />
      </div>
      <div className="settings-wrapper__item">
        <p className="settings-item__title">Mines: {mineCount}</p>
        <input className="settings-input" type="range" min={MIN_MINES} max={maxMineCount} value={mineCount} onChange={onChangeMines} />
      </div>
      <div className="settings-wrapper__item">
        <p className="settings-item__title">Sounds: {soundsVolume}</p>
        <input className="settings-input" type="range" min={MIN_VOLUME} max={MAX_VOLUME} value={soundsVolume} onChange={onChangeSoundsVolume} />
      </div>
      <div className="settings-wrapper__item-music">
        <p className="settings-item__title">Music: {musicVolume}</p>
        <input className="settings-input" type="range" min={MIN_VOLUME} max={MAX_VOLUME} value={musicVolume} onChange={onChangeMusicVolume} />
      </div>
      <button className="settings-button settings-button-records" onClick={onClickRecords}>Show records</button>
      <button className="settings-button" onClick={onClickSet}>Set</button>
    </div>
  );
};

export default Settings;
