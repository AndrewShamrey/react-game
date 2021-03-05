import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: ${({ cellSize, cellMargin, widthSize }) => widthSize * (cellSize + cellMargin * 2)}px;
`;
