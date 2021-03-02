import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAuth, setName, restartGame } from "../actions/control";
import Auth from "../components/auth/auth";

const AuthContainer = () => {
  const dispatch = useDispatch();
  const enableAuth = useSelector((rootState) => rootState.control.enableAuth);

  const [name, setInputName] = useState("");

  const onChangeName = useCallback((e) => {
    setInputName((e.target.value));
  }, []);

  const onClickAuth = useCallback(() => {
    if (!name) {
      return;
    }
    dispatch(setName(name));
    dispatch(restartGame());
    dispatch(hideAuth());
  }, [name]);

  return (
    <>
      {enableAuth && (
        <Auth
          name={name}
          onChangeName={onChangeName}
          onClickAuth={onClickAuth}
        />
      )}
    </>
  );
};

export default AuthContainer;
