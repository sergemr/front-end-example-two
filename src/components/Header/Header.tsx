import React, { Dispatch, ReactEventHandler, SetStateAction } from "react";
import styles from "./Header.module.scss";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
const pages = ["Articles", "Favorites"];

interface iHeader {
  handleToggleFavs: (value: boolean) => void;
  setShouldLoginOpen: Dispatch<SetStateAction<boolean>>;
}
const Header: React.FC<iHeader> = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const user = useSelector((state: RootState) => state.user.user);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e: any) => {
    let child = e.target.innerHTML;

    props.handleToggleFavs(false);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  return (
    <div className={styles.Header} data-testid="Header">
      <AppBar
        position="static"
        style={{ color: "blue", backgroundColor: "white" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <img src="/images/logo.JPG" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  key={`Articles`}
                  onClick={(e) => {
                    props.handleToggleFavs(false);
                    navigate(`/home`);
                  }}
                >
                  <Typography style={{ color: "blue" }} textAlign="center">
                    Articles
                  </Typography>
                </MenuItem>
                <MenuItem
                  key={`Favorites`}
                  onClick={(e) => {
                    props.handleToggleFavs(true);
                  }}
                >
                  <Typography style={{ color: "blue" }} textAlign="center">
                    Favorites
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img src="/images/logo.JPG" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key={`page1`}
                onClick={(e) => {
                  props.handleToggleFavs(false);
                  navigate(`/home`);
                }}
                sx={{ my: 2, display: "block" }}
              >
                Articles
              </Button>
              <Button
                key={`page2`}
                onClick={(e) => props.handleToggleFavs(true)}
                sx={{ my: 2, display: "block" }}
              >
                Favorites
              </Button>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {user && user.userID ? (
                <div>
                  <MenuItem
                    key={`Articles`}
                    onClick={(e) => navigate(`/create-post/`)}
                  >
                    <Typography style={{ color: "blue" }} textAlign="center">
                      New Post
                    </Typography>
                  </MenuItem>

                  <Typography style={{ color: "blue" }} textAlign="center">
                    <span>{user.userMail}</span>
                  </Typography>
                </div>
              ) : (
                <MenuItem
                  key={`Articles`}
                  onClick={(e) => props.setShouldLoginOpen(true)}
                >
                  <Typography style={{ color: "blue" }} textAlign="center">
                    Login
                  </Typography>
                </MenuItem>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
