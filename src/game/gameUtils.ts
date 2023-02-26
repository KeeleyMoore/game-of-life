import { BoardState } from "./GameState";

export const calculateNextState = (prevState: BoardState): BoardState => {
  const newState: number[][] = [];
  prevState.forEach((row, rowIndex) => {
    const prevRowIndex = rowIndex - 1 < 0 ? prevState.length - 1 : rowIndex - 1;
    const nextRowIndex = rowIndex + 1 > prevState.length - 1 ? 0 : rowIndex + 1;
    const rowLength = row.length;

    const curRow = [...row];

    row.forEach((cellAlive, cellIndex) => {
      const liveCount = calculateLivingNeighbours(prevState, prevRowIndex, rowIndex, nextRowIndex, rowLength, cellIndex);
      const newCellValue = calculateCellValue(!!cellAlive, liveCount);

      if (typeof newCellValue === 'number') {
        curRow[cellIndex] = newCellValue;
      }

    })
    newState[rowIndex] = curRow;
  });

  return newState;
}

const calculateCellValue = (cellAlive: boolean, liveCount: number) => {
  if (cellAlive && (liveCount < 2 || liveCount > 3)) {
    // underpopulated / overpopulated death
    return 0;
  } else if (!cellAlive && liveCount === 3) {
    // cell growth
    return 1;
  }

  return;
}

const calculateLivingNeighbours = (
  state: BoardState, prevRowIndex: number, rowIndex: number, nextRowIndex: number, rowLength: number, cellIndex: number
) => {
  const prevCellIndex = cellIndex < 1 ? rowLength - 1 : cellIndex - 1;
  const nextCellIndex = cellIndex + 1 > rowLength - 1 ? 0 : cellIndex + 1;

  const prevRowLiveCount = state[prevRowIndex][prevCellIndex] + state[prevRowIndex][cellIndex] + state[prevRowIndex][nextCellIndex];
  const curRowLiveCount = state[rowIndex][prevCellIndex] + state[rowIndex][nextCellIndex];
  const nextRowLiveCount = state[nextRowIndex][prevCellIndex] + state[nextRowIndex][cellIndex] + state[nextRowIndex][nextCellIndex];

  return prevRowLiveCount + curRowLiveCount + nextRowLiveCount;
}