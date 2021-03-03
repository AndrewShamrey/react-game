import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHotkeys } from 'react-hotkeys-hook';
import { GAME } from "../utils/constants";
import { showSettings, restartGame, updateElapsedTime } from "../actions/control";
import Status from "../components/status/status";

const StatusContainer = () => {
  const dispatch = useDispatch();
  const enableAuth = useSelector((rootState) => rootState.control.enableAuth);
  const enableSettings = useSelector((rootState) => rootState.control.enableSettings);
  const enableRecords = useSelector((rootState) => rootState.control.enableRecords);
  const enableBackSetting = useSelector((rootState) => rootState.control.enableBackSetting);
  const gameState = useSelector((rootState) => rootState.control.gameState);
  const enableTimer = useSelector((rootState) => rootState.control.enableTimer);
  const elapsedTime = useSelector((rootState) => rootState.control.elapsedTime);
  const mineCount = useSelector((rootState) => rootState.control.mineCount);
  const flagCount = useSelector((rootState) => rootState.control.flagCount);

  useEffect(() => {
    let gameTimer;
    if (enableTimer) {
      gameTimer = setInterval(() => {
        dispatch(updateElapsedTime());
      }, 1000);
    }
    return () => {
      clearInterval(gameTimer);
    };
  }, [enableTimer]);

  const getResultEmoji = useCallback((gameState) => {
    switch (gameState) {
      case GAME.WIN:
        return "😎";
      case GAME.LOSE:
        return "😢";
      default:
        return "😄";
    }
  }, [gameState]);

  const onClickRestart = useCallback(() => {
    dispatch(restartGame());
  }, []);

  const onClickSettings = useCallback(() => {
    dispatch(showSettings());
  }, []);

  // useHotkeys('Escape', () => {
  //   onClickSettings();
  // });

  return (
    <>
      {!enableSettings && !enableAuth && !enableRecords && !enableBackSetting && (
        <Status
          leftMineCount={mineCount - flagCount}
          mineCount={mineCount}
          resultEmoji={getResultEmoji(gameState)}
          elapsedTime={elapsedTime.toString().padStart(3, "0")}
          onClickRestart={onClickRestart}
          onClickSettings={onClickSettings}
        />
      )}
    </>
  );
};

export default StatusContainer;
