import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  inline: {
    display: "inline",
  },
}));

export default function FriendItem(props) {
  const classes = useStyles();

  return (
    <>
      {props.friends.map((friend, index) => {
        return (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={friend.linkAvatar} />
              </ListItemAvatar>
              <ListItemText
                primary={friend.topic}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {friend.name}
                    </Typography>
                    {friend.answer}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </>
  );
}

FriendItem.propTypes = {
  friends: PropTypes.array,
};
