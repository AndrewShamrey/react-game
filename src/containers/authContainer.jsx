import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAuth, setName } from "../actions/control";
import Auth from "../components/auth/auth";

const AuthContainer = () => {
  const dispatch = useDispatch();
  const enableAuth = useSelector((rootState) => rootState.control.enableAuth);
  const gamerName = useSelector((rootState) => rootState.control.gamerName);

  const [name, setInputName] = useState("");

  const onChangeName = useCallback((e) => {
    setInputName((e.target.value));
  }, []);

  const onClickYes = useCallback((e) => {
    dispatch(setName(gamerName));
    dispatch(hideAuth());
  }, [gamerName]);

  const onClickAuth = useCallback(() => {
    if (!name) {
      return;
    }
    dispatch(setName(name));
    dispatch(hideAuth());
  }, [name]);

  return (
    <>
      {enableAuth && (
        <Auth
          name={name}
          onChangeName={onChangeName}
          onClickAuth={onClickAuth}
          gamerName={gamerName}
          onClickYes={onClickYes}
        />
      )}
    </>
  );
};

export default AuthContainer;
