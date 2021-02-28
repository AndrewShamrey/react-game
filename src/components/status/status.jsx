import "./status.css";

const Status = ({ leftMineCount, mineCount, resultEmoji, elapsedTime, onClickRestart, onClickSettings }) => {
  return (
    <div className="status-wrapper">
      <div className="status-mines">💣 {leftMineCount} / {mineCount}</div>
      <div className="status-btns-wrapper">
        <span className="status-btn" title="Restart" onClick={onClickRestart}>{resultEmoji}</span>
        <span className="status-btn status-btn-settings" title="Settings" onClick={onClickSettings}>⚙️</span>
      </div>
      <div className="status-timer">🕙 {elapsedTime}</div>
    </div>
  );
};

export default Status;
