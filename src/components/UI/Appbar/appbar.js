import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmailIcon from "@material-ui/icons/Email";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const drawerWidth = 270;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

function Appbar(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ marginRight: "auto" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Nudle_Logo.png"
            width={100}
            alt=""
          />
        </Typography>
        <NotificationsIcon style={{ marginRight: "10px" }} />
        <EmailIcon style={{ marginRight: "10px" }} />
        {props.logged ? (
          <Button onClick={props.logOut} variant="outlined">
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button color="secondary" variant="outlined">
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;

Appbar.propTypes = {
  logged: PropTypes.bool,
  logOut: PropTypes.func,
};
