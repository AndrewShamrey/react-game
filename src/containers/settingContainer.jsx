import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHotkeys } from 'react-hotkeys-hook';
import { hideSettings, setGame, restartGame, showRecords, showBackSetting } from "../actions/control";
import Settings from "../components/settings/settings";

const SettingsContainer = () => {
  const dispatch = useDispatch();
  const enableSettings = useSelector((rootState) => rootState.control.enableSettings);
  const stateWidth = useSelector((rootState) => rootState.control.width);
  const stateHeight = useSelector((rootState) => rootState.control.height);
  const stateMineCount = useSelector((rootState) => rootState.control.mineCount);
  const stateSoundsVolume = useSelector((rootState) => rootState.control.soundsVolume);
  const stateMusicVolume = useSelector((rootState) => rootState.control.musicVolume);

  const [width, setWidth] = useState(stateWidth);
  const [height, setHeight] = useState(stateHeight);
  const [mineCount, setMineCount] = useState(stateMineCount);
  const [soundsVolume, setSoundsVolume] = useState(stateSoundsVolume);
  const [musicVolume, setMusicVolume] = useState(stateMusicVolume);

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
  }, []);

  const onClickSetBack = useCallback(() => {
    dispatch(showBackSetting());
  }, []);

  const onClickClose = useCallback(() => {
    dispatch(hideSettings());
  }, []);

  const onClickSet = useCallback(() => {
    dispatch(setGame(width, height, mineCount, soundsVolume, musicVolume));
    dispatch(restartGame());
    dispatch(hideSettings());
  }, [width, height, mineCount, soundsVolume, musicVolume]);

  // useHotkeys('Enter', () => {
  //   onClickSet();
  // });

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
