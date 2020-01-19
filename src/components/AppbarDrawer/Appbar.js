import React from "react";
import { CssBaseline } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { AccountCircle } from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions";
import * as ROUTES from "../../constants/routes";
import history from "../../history";

export default function Appbar({
  classes,
  isAuthenticated,
  drawerOpen,
  handleDrawerOpen
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const dispatch = useDispatch();

  const user = useSelector(store => store.auth.user);

  function handleLogout() {
    dispatch(logoutUser());
    handleCloseMenu();
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleTitleClicked() {
    history.push(ROUTES.HOME);
  }

  function renderDrawerIcon() {
    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.menuButton, {
          [classes.hide]: drawerOpen
        })}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  function renderUserMenu() {
    return (
      <>
        <Typography>{user && user.displayName}</Typography>
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={menuOpen}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
      >
        <Toolbar>
          {isAuthenticated && renderDrawerIcon()}
          <Typography
            variant="h6"
            className={classes.title}
            onClick={handleTitleClicked}
          >
            Shopping Cart
          </Typography>
          {isAuthenticated && renderUserMenu()}
        </Toolbar>
      </AppBar>
    </>
  );
}
