import React, { useEffect, useState } from "react";
import ErrorAlert from "../errors/error.js";
import LoginForm from "./loginForm/loginForm";

import { connect } from "react-redux";
import { errorOccurred, logIn, browseCaptcha } from "../../store/actions/auth";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import isJS from "is_js";

function Login(props) {
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
      <LoginForm
        handleChange={handleChange}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleLogin={handleLogin}
        values={values}
        captcha={props.captcha}
        rememberMe={rememberMe}
        setRememberMe={setRememberMe}
      />
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
