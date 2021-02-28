import React from "react";
import { MIN_WIDTH, MAX_WIDTH, MIN_HEIGHT, MAX_HEIGHT, MIN_MINES } from "../../constants";
import "./settings.css";

const Settings = ({ width, height, mineCount, maxMineCount, onChangeWidth, onChangeHeight, onChangeMines, onClickSet }) => {
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
      <div className="settings-wrapper__item-mines">
        <p className="settings-item__title">Mines: {mineCount}</p>
        <input className="settings-input" type="range" min={MIN_MINES} max={maxMineCount} value={mineCount} onChange={onChangeMines} />
      </div>
      <button className="settings-button" onClick={onClickSet}>Set</button>
    </div>
  );
};

export default Settings;
