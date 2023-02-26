import { FC } from "react";

import { Box } from "@mui/material";

type BoardState = number[][];

interface BoardProps {
  boardState: BoardState;
  onCellClick: (rowIndex: number, cellIndex: number) => void;
}

const Board: FC<BoardProps> = ({ boardState, onCellClick }) => (
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
            onClick={() => onCellClick(rowIndex, cellIndex)}
          />
        ))}
      </Box>
    ))}
  </Box>
)

export default Board;
