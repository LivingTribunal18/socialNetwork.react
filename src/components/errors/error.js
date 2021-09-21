import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "100px",
    "& > * + *": {
      margin: theme.spacing(2),
    },
  },
}));

export default function ErrorAlert(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {props.errors.map((error) => {
          return error;
        })}
        — <strong>check it out!</strong>
      </Alert>
    </div>
  );
}

ErrorAlert.propTypes = {
  errors: PropTypes.array,
};
