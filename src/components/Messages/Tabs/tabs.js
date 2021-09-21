import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Typography, Box, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import "./tabs.css";

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

  return (
    <>
      <Typography color="textSecondary" variant="h4">
        Dialogs
      </Typography>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={props.value}
          onChange={props.handleChange}
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
              <TabPanel
                key={index + Date.now()}
                value={props.value}
                index={index}
              >
                {props.messages.map((message, index) => {
                  let cls;
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
                        <span className="avatarImg"> </span>
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
            className="sendMessage"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              onChange={(event) => {
                props.changeHandler(event);
              }}
              id="standard-basic"
              className="textField"
              placeholder="Input word"
            />
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={props.createMessageHandler}
            >
              <SendIcon />
            </IconButton>
          </form>
        </div>
      </div>
    </>
  );
}

VerticalTabs.propTypes = {
  messages: PropTypes.array,
  changeHandler: PropTypes.func,
  createMessageHandler: PropTypes.func,
  handleChange: PropTypes.func,
};

export default VerticalTabs;
