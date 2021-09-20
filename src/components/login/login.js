import React, { useEffect, useState } from "react";
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
import ErrorAlert from "../errors/error.js";
import "./login.css";

import { connect } from "react-redux";
import { errorOccurred, logIn, browseCaptcha } from "../../store/actions/auth";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import isJS from "is_js";

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

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const [rememberMe, setRememberMe] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    if (props.logged) {
      history.push("/profile");
    }
  }, [props.initialization]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let formEelements = e.target.elements;
    let email = "";
    let password = formEelements["password"].value;

    let captcha = null;
    if (props.captcha) {
      captcha = formEelements["captcha"].value;
    }

    if (isJS.email(formEelements["email"].value)) {
      email = formEelements["email"].value;
      props.logIn(email, password, rememberMe, captcha);
    } else {
      props.errorOccurred(["Incorrect Email Spelling"]);
    }
  };

  return (
    <>
      {props.errors && <ErrorAlert errors={props.errors} />}
      <form className={classes.root} onSubmit={handleLogin}>
        <TextField label="Email" name="email" id="standard-size-normal" />
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            name="password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
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
                checked={rememberMe}
                onChange={() => {
                  setRememberMe(!rememberMe);
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

function mapStateToProps(state) {
  return {
    logged: state.auth.logged,
    captcha: state.auth.captcha,
    errors: state.auth.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logIn: (email, password, rememberMe) =>
      dispatch(logIn(email, password, rememberMe)),
    errorOccurred: (e) => dispatch(errorOccurred(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
