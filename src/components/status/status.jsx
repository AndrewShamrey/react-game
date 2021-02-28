import "./status.css";

const Status = ({ leftMineCount, mineCount, resultEmoji, enableSettings, elapsedTime, onClickRestart, onClickSettings }) => {
  return (
    <div className="status-wrapper">
      <div className="status-mines">💣 {leftMineCount} / {mineCount}</div>
      <div className="status-btns-wrapper">
        <span className="status-btn" title="Restart" onClick={onClickRestart}>{resultEmoji}</span>
        {enableSettings && (
          <span className="status-btn" title="Settings" onClick={onClickSettings}>⚙️</span>
        )}
      </div>
      <div className="status-timer">🕙 {elapsedTime}</div>
    </div>
  );
};

export default Status;
