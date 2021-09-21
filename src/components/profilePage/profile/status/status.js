import React, { useState, useEffect } from "react";
import { alpha, withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import PropTypes from "prop-types";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": { marginTop: theme.spacing(2) },
  },
  input: {
    borderRadius: 2,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Roboto",
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
}));

function Status(props) {
  const classes = useStyles();
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const postStatus = (event) => {
    if (event.key === "Enter" && status.trim().length) {
      props.publishStatus(status);
    }
  };

  const changeStatusHandler = (e) => {
    let inpValue = e.target.value;
    setStatus(inpValue);
  };

  return (
    <form
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="bootstrap-input">
          Status
        </InputLabel>
        <BootstrapInput
          onChange={(e) => {
            changeStatusHandler(e);
          }}
          onKeyPress={postStatus}
          value={status}
          id="bootstrap-input"
          disabled={props.statusDisabled}
        />
      </FormControl>
    </form>
  );
}

Status.propTypes = {
  publishStatus: PropTypes.func,
  status: PropTypes.string,
  statusDisabled: PropTypes.bool,
};

export default Status;
