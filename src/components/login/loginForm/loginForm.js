import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  TextField,
  Fab,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./loginForm.css";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: "100px",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30%",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "30%",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();

  return (
    <>
      <form className={classes.root} onSubmit={props.handleLogin}>
        <TextField label="Email" name="email" id="standard-size-normal" />
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            name="password"
            type={props.values.showPassword ? "text" : "password"}
            value={props.values.password}
            onChange={props.handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={props.handleClickShowPassword}
                  onMouseDown={props.handleMouseDownPassword}
                >
                  {props.values.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {props.captcha && (
          <div className="captcha">
            <img src={props.captcha} alt="captcha" />
            <TextField
              required
              label="Captcha"
              name="captcha"
              id="standard-size-normal"
              className="captchaInput"
            />
          </div>
        )}

        <div className={"formBottom"}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.rememberMe}
                onChange={() => {
                  props.setRememberMe(!props.rememberMe);
                }}
                name="checkedB"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Fab
            type="submit"
            variant="extended"
            size="small"
            color="primary"
            className={classes.margin}
          >
            <NavigationIcon className={classes.extendedIcon} />
            Log in
          </Fab>
        </div>
      </form>
    </>
  );
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  handleChange: PropTypes.func,
  handleClickShowPassword: PropTypes.func,
  handleMouseDownPassword: PropTypes.func,
  setRememberMe: PropTypes.func,
  captcha: PropTypes.string,
  rememberMe: PropTypes.bool,
  values: PropTypes.object,
};
