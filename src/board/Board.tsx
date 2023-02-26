import { FC, useState } from "react";

import { Box, Button } from "@mui/material";

import useInterval from "../hooks/useInterval";
// https://leetcode.com/problems/game-of-life/

const generateBoard = (size: number): number[][] => {
  return Array.from(Array(size), () => Array.from(Array(size), () => 0));
}

type BoardState = number[][];

interface BoardProps {
  boardSize: number;
}

const Board: FC<BoardProps> = ({ boardSize }) => {
  const [boardState, setBoardState] = useState<BoardState>(generateBoard(boardSize));
  const [playing, setPlaying] = useState<boolean>(false);
  const [delay] = useState<number>(100);


  const calculateNextState = (prevState: BoardState): BoardState => {
    const newState: number[][] = [];

    prevState.forEach((row, rowIndex) => {
      const prevRowIndex = rowIndex - 1 < 0 ? prevState.length - 1 : rowIndex - 1;
      const nextRowIndex = rowIndex + 1 > prevState.length - 1 ? 0 : rowIndex + 1;
      const curRow = [...row];
      row.forEach((cellAlive, cellIndex) => {
        const prevCellIndex = cellIndex < 1 ? row.length - 1 : cellIndex - 1;
        const nextCellIndex = cellIndex + 1 > row.length - 1 ? 0 : cellIndex + 1;

        // TODO:: extract into functions returning live count
        const prevRowLiveCount = prevState[prevRowIndex][prevCellIndex] + prevState[prevRowIndex][cellIndex] + prevState[prevRowIndex][nextCellIndex];
        const curRowLiveCount = prevState[rowIndex][prevCellIndex] + prevState[rowIndex][nextCellIndex];
        const nextRowLiveCount = prevState[nextRowIndex][prevCellIndex] + prevState[nextRowIndex][cellIndex] + prevState[nextRowIndex][nextCellIndex];

        const liveCount = prevRowLiveCount + curRowLiveCount + nextRowLiveCount;

        // TODO:: extract into function returning (newValue?: number) to conditionally set value
        if (cellAlive && liveCount < 2) {
          // underpopulated death
          curRow[cellIndex] = 0;
        } else if (cellAlive && (liveCount === 2 || liveCount === 3)) {
          // stay alive
        } else if (cellAlive && liveCount > 3) {
          // overpopulated death
          curRow[cellIndex] = 0;
        } else if (!cellAlive && liveCount === 3) {
          // cell growth
          curRow[cellIndex] = 1;
        }
      })
      newState[rowIndex] = curRow;
    });
    return newState;
  }

  const handleNextClick = () => {
    setBoardState(calculateNextState);
  }

  useInterval(handleNextClick, playing ? delay : null);

  const handleCellClick = (row: number, cell: number) => {
    setBoardState((prev) => {
      const newState = [...prev];
      const newRow = [...newState[row]]
      newRow[cell] = newRow[cell] ? 0 : 1;
      newState[row] = newRow;

      return newState;
    })
  }

  const handlePlay = () => {
    setPlaying(true);
  }
  const handlePause = () => {
    setPlaying(false);
  }
  const handleClear = () => {
    setPlaying(false);
    setBoardState(generateBoard(boardSize));
  }

  return (
    <Box p={2} mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {boardState.map((row, rowIndex) => (
        <Box display="flex" key={'row' + rowIndex}>
          {row.map((cell, cellIndex) => (
            <Box
              key={`${rowIndex}-${cellIndex}`}
              height={20}
              width={20}
              bgcolor={cell ? 'primary.main' : "white"}
              border="1px solid"
              borderColor="secondary.main"
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            />
          ))}
        </Box>
      ))}
      {/* TODO:: Extract into separate component and add icons to buttons */}
      <Box my={2} rowGap={1} columnGap={1} width="100%" display="flex" justifyContent="center">
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handlePause}
          disabled={!playing}
        >
          pause
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={handlePlay}
          disabled={playing}
        >
          play
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleNextClick}
        >
          Next Step
        </Button>
      </Box>
    </Box>
  )
}

export default Board;
