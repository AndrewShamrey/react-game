import CellContainer from "../../containers/cellContainer";
import { Wrapper } from "./boardStyles";

const Board = ({ cellSize, cellMargin, width, height, onRightClickBoard }) => {
  return (
    <Wrapper cellSize={cellSize} cellMargin={cellMargin} widthSize={width} onContextMenu={onRightClickBoard}>
      {Array(width * height).fill().map((item, index) => (
          <CellContainer key={index} x={index % width} y={Math.floor(index / width)} />
        ))}
    </Wrapper>
  );
};

export default Board;
