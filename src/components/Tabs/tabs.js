import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, IconButton } from "@material-ui/core/";
import SendIcon from "@material-ui/icons/Send";
import "./tabs.css";
// import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { writeNewMessage } from "../../store/actions/auth";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  reverseChat: {
    flexDirection: "row-reverse",
  },
}));

function VerticalTabs(props) {
  const classes = useStyles();
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

  return (
    <>
      <Typography color="textSecondary" variant="h4">
        Dialogs
      </Typography>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {[0, 1, 2, 3].map((tab, index) => {
            return (
              <Tab
                key={index + Date.now() + tab}
                label={`User ${tab + 1}`}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        <div
          className="rightTab"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {props.messages.map((tabPanel, index) => {
            return (
              <TabPanel key={index + Date.now()} value={value} index={index}>
                {props.messages.map((message, index) => {
                  let cls = "";
                  if (index % 2 === 0) {
                    cls = classes.reverseChat + " chatBox";
                  } else {
                    cls = "chatBox";
                  }
                  return (
                    <span
                      className={cls}
                      key={index + Math.random() + Date.now()}
                    >
                      <span className="avatarBlock">
                        <span className="avatarImg"></span>
                        <span>Friend </span>
                      </span>
                      <span className="messageBlock">
                        {message.textes.map((txt) => {
                          return txt.text;
                        })}
                      </span>
                    </span>
                  );
                })}
              </TabPanel>
            );
          })}
          <form
            noValidate
            className="sendMesg"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              onChange={(event) => {
                changeHandler(event);
              }}
              id="standard-basic"
              className="textField"
              placeholder="Input word"
            />
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={createMessageHandler}
            >
              <SendIcon />
            </IconButton>
          </form>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    messages: state.auth.loggedUser.messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    writeNewMessage: (message) => dispatch(writeNewMessage(message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabs);
