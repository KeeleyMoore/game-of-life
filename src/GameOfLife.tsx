import { FC } from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Box, ThemeProvider } from '@mui/material';

import { Header } from './components';
import { GameState } from './game';

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#688a50',
    },
    secondary: {
      // light: '#9a0541',
      main: '#6c0b3b',
      // dark: '#440c32'
    },
    background: {
      default: '#415558'
    }
  }
}));

const GameOfLife: FC = () => (
  <ThemeProvider theme={theme}>
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <GameState />
    </Box>
  </ThemeProvider>
);

export default GameOfLife;

// #9a0541
// #6c0b3b //secondary
// #440c32
// #230a27
// #0c0d23
// #172733
// #294047
// #415558 //background
// #354b47
// #314a3b
// #375637
// #4d6d42
// #688a50 //primary
// #86a860
// #a3bb7e