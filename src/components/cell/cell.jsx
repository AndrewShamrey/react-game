import { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "./cellStyles";
import { CELL_SIZE, CELL_MARGIN } from "../../utils/constants";

const Cell = ({ cellCode, cellText, onClickCell, onRightClickCell }) => {
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

  return <Button cellCode={cellCode} cellSize={cellSize} cellMargin={cellMargin} onClick={onClickCell} onContextMenu={onRightClickCell} >{cellText}</Button>;
};

export default memo(Cell);
