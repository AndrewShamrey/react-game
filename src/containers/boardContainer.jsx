import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Board } from "../components/board/board";

const BoardContainer = () => {
  const enableSettings = useSelector((rootState) => rootState.control.enableSettings);
  const width = useSelector((rootState) => rootState.control.width);
  const height = useSelector((rootState) => rootState.control.height);

  const onRightClickBoard = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      {!enableSettings && (
        <Board
          width={width}
          height={height}
          onRightClickBoard={onRightClickBoard}
        />
      )}
    </>
  );
};

export default BoardContainer;
