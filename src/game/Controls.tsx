import { FC } from "react"
import { Box, Button } from "@mui/material";

import ClearIcon from '@mui/icons-material/Clear';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface ControlsProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  onClear: () => void;
  onNext: () => void;
}

const Controls: FC<ControlsProps> = ({ playing, setPlaying, onClear, onNext }) => {
  const handlePlayPauseToggle = () => {
    setPlaying(prev => !prev);
  }

  const handleNextStep = () => {
    setPlaying(false);
    onNext();
  }

  const handleClear = () => {
    setPlaying(false);
    onClear();
  }

  return (
    <Box my={2} rowGap={1} columnGap={1} width="100%" display="flex" justifyContent="center">
      <Button
        color="secondary"
        variant="contained"
        onClick={handleClear}
        endIcon={<ClearIcon />}
      >
        Clear
      </Button>
      <Button
        color="secondary"
        variant="contained"
        onClick={handlePlayPauseToggle}
        endIcon={playing ? <PauseIcon /> : <PlayArrowIcon />}
      >
        {playing ? 'Pause' : 'Play'}
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={handleNextStep}
        endIcon={<SkipNextIcon />}
      >
        Next Step
      </Button>
    </Box>
  );
}

export default Controls;
