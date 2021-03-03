import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBack, hideBackSetting } from "../actions/control";
import BackSetting from "../components/backSetting/backSetting";

const BackSettingContainer = () => {
  const dispatch = useDispatch();
  const backIndex = useSelector((rootState) => rootState.control.backIndex);
  const enableBackSetting = useSelector((rootState) => rootState.control.enableBackSetting);

  const handleClickImage = useCallback((e) => {
    const index = e.target.getAttribute('index');
    dispatch(selectBack(index));
  }, []);
  
  const onClickClose = useCallback(() => {
    dispatch(hideBackSetting());
  }, []);

  return (
    <>
      {enableBackSetting && (
        <BackSetting
          backIndex={backIndex} 
          handleClickImage={handleClickImage}
          onClickClose={onClickClose}
        />
      )}
    </>
  );
};

export default BackSettingContainer;
