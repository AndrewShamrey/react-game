import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { CELL_SIZE, CELL_MARGIN } from "../utils/constants";
import Board from "../components/board/board";

const BoardContainer = () => {
  const enableAuth = useSelector((rootState) => rootState.control.enableAuth);
  const enableSettings = useSelector((rootState) => rootState.control.enableSettings);
  const enableRecords = useSelector((rootState) => rootState.control.enableRecords);
  const enableBackSetting = useSelector((rootState) => rootState.control.enableBackSetting);
  const width = useSelector((rootState) => rootState.control.width);
  const height = useSelector((rootState) => rootState.control.height);

  const [cellSize, setSize] = useState(CELL_SIZE);
  const [cellMargin, setMargin] = useState(CELL_MARGIN);

  useEffect(() => {
    if (width > 17 || height > 17) {
      setSize(20);
      setMargin(1);
    } else if (width > 14 || height > 14) {
      setSize(25);
      setMargin(1);
    } else if (width > 12 || height > 12) {
      setSize(35);
      setMargin(2);
    } else {
      setSize(42);
      setMargin(2);
    }
  }, [width, height]);

  const onRightClickBoard = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <>
      {!enableSettings && !enableAuth && !enableRecords && !enableBackSetting && (
        <Board
          cellSize={cellSize}
          cellMargin={cellMargin}
          width={width}
          height={height}
          onRightClickBoard={onRightClickBoard}
        />
      )}
    </>
  );
};

export default BoardContainer;
