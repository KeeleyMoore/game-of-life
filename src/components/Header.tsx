import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h3">Game of Life</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
