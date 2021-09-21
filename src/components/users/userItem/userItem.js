import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Avatar, Typography } from "@material-ui/core";
import ava from "../../../img/seb-creativo-3jG-UM8IZ40-unsplash.jpg";
import "./userItem.css";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: "270px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(1),
    cursor: "pointer",
  },
}));

export default function UserItem(props) {
  const classes = useStyles();

  return (
    <>
      {props.users.map((user) => {
        return (
          <div className="userFollow" key={Math.random()}>
            <div className="avatarFollow">
              <Link to={`/profile/${user.id}`}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user.photos.large || user.photos.small
                      ? user.photos.large || user.photos.small
                      : ava
                  }
                  className={classes.large}
                />
              </Link>
              {user.followed ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    props.changeFollowing(user.id, false);
                  }}
                  disabled={props.btnLoader}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    props.changeFollowing(user.id, true);
                  }}
                  disabled={props.btnLoader}
                >
                  Follow
                </Button>
              )}
            </div>
            <div className="infoUser">
              <div className="nameFollow">
                <Typography variant="h6" gutterBottom>
                  {user.name} {user.id}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {user.id}
                </Typography>
              </div>
              <Typography component="p">What are you searching for?</Typography>
            </div>
          </div>
        );
      })}
    </>
  );
}

UserItem.propTypes = {
  changeFollowing: PropTypes.func,
  users: PropTypes.array,
  btnLoader: PropTypes.bool,
};
