Game of Life

Attempt game of life challenge, with experiments and controls

Features:
  - Presets
    * drop down with rendered preview
  - Area on/off/invert
  - Speed control
  - History and timeline steps
  - Add playing / paused indicator

Improvements: 
  - separate board rendering from react code to speed up rendering
    * use ref on its on context for easier control
  - use reducer and dispatch actions to update board
  - tile hover indicator
  - improve header styles
  - move buttons above the board (maybe into the header? - also need room for presets)
  - improve color scheme

Tasks:
  - Test performance in profiler before separating the board from react code