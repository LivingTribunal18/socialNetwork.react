import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography } from "@material-ui/core";
import Loader from "../UI/loader/loader";
import UserItem from "./userItem/userItem";

import { connect } from "react-redux";

import {
  browseUsers,
  increaseCount,
  changeFollowing,
} from "../../store/actions/users";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function Users(props) {
  const classes = useStyles();

  useEffect(() => {
    props.browseUsers();
  }, [props.count]);

  return (
    <Container className="usersMain">
      <div className={classes.toolbar} />
      <Typography variant="h5">Users</Typography>
      {props.loading ? (
        <Loader />
      ) : (
        <UserItem
          changeFollowing={props.changeFollowing}
          users={props.users}
          btnLoader={props.btnLoader}
        />
      )}

      <Button
        color="primary"
        onClick={() => {
          props.increaseCount();
        }}
        style={{ width: "100%" }}
      >
        Show more
      </Button>

      <div className={classes.toolbar} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    count: state.users.count,
    loading: state.users.loading,
    btnLoader: state.users.btnLoader,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    browseUsers: () => dispatch(browseUsers()),
    increaseCount: () => dispatch(increaseCount()),
    changeFollowing: (id, followed) => dispatch(changeFollowing(id, followed)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
