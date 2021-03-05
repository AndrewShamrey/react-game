import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideSettings, setGame, restartGame, showRecords, showBackSetting } from "../actions/control";
import { MIN_WIDTH, MIN_HEIGHT, MIN_MINES, MAX_VOLUME } from '../utils/constants';
import Settings from "../components/settings/settings";

const SettingsContainer = () => {
  const dispatch = useDispatch();
  const enableSettings = useSelector((rootState) => rootState.control.enableSettings);

  let prevState = JSON.parse(localStorage.getItem('currentGameConfig'));
  if (!prevState) {
    prevState = {}
  }

  const [width, setWidth] = useState(prevState.width || MIN_WIDTH);
  const [height, setHeight] = useState(prevState.height || MIN_HEIGHT);
  const [mineCount, setMineCount] = useState(prevState.mineCount || MIN_MINES);
  const [soundsVolume, setSoundsVolume] = useState(prevState.soundsVolume || MAX_VOLUME / 2);
  const [musicVolume, setMusicVolume] = useState(prevState.musicVolume || MAX_VOLUME / 2);

  useEffect(() => {
    const maxMineCount = (width - 1) * (height - 1);
    if (mineCount > maxMineCount) {
      setMineCount(maxMineCount);
    }
  }, [width, height, mineCount]);

  const onChangeWidth = useCallback((e) => {
    setWidth(parseInt(e.target.value));
  }, []);

  const onChangeHeight = useCallback((e) => {
    setHeight(parseInt(e.target.value));
  }, []);

  const onChangeMines = useCallback((e) => {
    setMineCount(parseInt(e.target.value));
  }, []);

  const onChangeSoundsVolume = useCallback((e) => {
    setSoundsVolume(parseInt(e.target.value));
  }, []);

  const onChangeMusicVolume = useCallback((e) => {
    setMusicVolume(parseInt(e.target.value));
  }, []);

  const onClickRecords = useCallback(() => {
    dispatch(showRecords());
  }, [dispatch]);

  const onClickSetBack = useCallback(() => {
    dispatch(showBackSetting());
  }, [dispatch]);

  const onClickClose = useCallback(() => {
    dispatch(hideSettings());
  }, [dispatch]);

  const onClickSet = useCallback(() => {
    dispatch(setGame(width, height, mineCount, soundsVolume, musicVolume));
    dispatch(restartGame());
    dispatch(hideSettings());
  }, [width, height, mineCount, soundsVolume, musicVolume, dispatch]);

  return (
    <>
      {enableSettings && (
        <Settings
          width={width}
          height={height}
          mineCount={mineCount}
          maxMineCount={(width - 1) * (height - 1)}
          soundsVolume={soundsVolume}
          musicVolume={musicVolume}
          onChangeWidth={onChangeWidth}
          onChangeHeight={onChangeHeight}
          onChangeMines={onChangeMines}
          onChangeSoundsVolume={onChangeSoundsVolume}
          onChangeMusicVolume={onChangeMusicVolume}
          onClickRecords={onClickRecords}
          onClickSetBack={onClickSetBack}
          onClickClose={onClickClose}
          onClickSet={onClickSet}
        />
      )}
    </>
  );
};

export default SettingsContainer;
