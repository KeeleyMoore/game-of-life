import { FC, useState } from "react";

import { Box } from "@mui/material";

import { useInterval } from "../hooks";
import { Board } from "../board";

import { calculateNextState } from "./gameUtils";
import Controls from "./Controls";

const generateBoard = (size: number): number[][] => {
  return Array.from(Array(size), () => Array.from(Array(size), () => 0));
}

export type BoardState = number[][];

interface GameStateProps {
  boardSize?: number;
}

const GameState: FC<GameStateProps> = ({ boardSize = 40 }) => {
  const [boardState, setBoardState] = useState<BoardState>(generateBoard(boardSize));
  const [playing, setPlaying] = useState<boolean>(false);
  const [delay] = useState<number>(20);


  const handleNext = () => {
    setBoardState(calculateNextState)
  }

  useInterval(handleNext, playing ? delay : null);

  const handleCellClick = (row: number, cell: number) => {
    setBoardState((prev) => {
      const newState = [...prev];
      const newRow = [...newState[row]]
      newRow[cell] = newRow[cell] ? 0 : 1;
      newState[row] = newRow;

      return newState;
    })
  }

  const handleClearBoard = () => {
    setBoardState(generateBoard(boardSize))
  }

  return (
    <Box p={2} mt={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Board
        boardState={boardState}
        onCellClick={handleCellClick}
      />
      <Controls
        playing={playing}
        setPlaying={setPlaying}
        onClear={handleClearBoard}
        onNext={handleNext}
      />
    </Box>
  )
}

export default GameState;
