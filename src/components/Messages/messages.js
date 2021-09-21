import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import VerticalTabs from "./Tabs/tabs";
import { connect } from "react-redux";
import { writeNewMessage } from "../../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const createMessageHandler = (event) => {
    event.preventDefault();

    props.writeNewMessage(messages);
  };

  const changeHandler = (event) => {
    let messageText = event.target.value;

    let userMessages = {
      idUser: value,
      textes: [],
    };

    let message = {
      text: messageText,
      date: Date.now(),
      userId: value,
    };

    userMessages.textes.push(message);

    setMessages(userMessages);
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.toolbar} />
      <VerticalTabs
        value={value}
        messages={props.messages}
        changeHandler={changeHandler}
        createMessageHandler={createMessageHandler}
        handleChange={handleChange}
      />
      <div className={classes.toolbar} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    messages: state.auth.messages, // TODO edit to dynamic messages[] from loggedUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    writeNewMessage: (message) => dispatch(writeNewMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
