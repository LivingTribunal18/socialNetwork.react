import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import VerticalTabs from "../Tabs/tabs";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function Messages() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      <VerticalTabs />
      <div className={classes.toolbar} />
    </>
  );
}

export default Messages;
