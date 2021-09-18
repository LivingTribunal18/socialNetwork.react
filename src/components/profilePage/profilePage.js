import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile/profile";
import NewPost from "../newPost/newPost";
import PostsList from "../postList/postsList";
import Loader from "../UI/loader/loader";

import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { browseUserById } from "../../store/actions/users";
import { publishStatus } from "../../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function ProfilePage(props) {
  const classes = useStyles();
  let location = useLocation();
  const [statusDisabled, setStatusDisabled] = useState(false);

  useEffect(() => {
    let loadUser = 0;
    if (props.match.params.id) {
      loadUser = props.match.params.id;
      setStatusDisabled(true);
    } else {
      loadUser = props.loggedUser.data.id || props.loggedUser.data.userId;
      setStatusDisabled(false);
    }
    props.browseUserById(loadUser);
  }, [location.pathname]);

  // if (
  //   props.activeUser &&
  //   props.activeUser.userId === props.loggedUser.data.userId
  // ) {
  // props.changeLoggedUser(props.activeUser);
  // }

  return (
    <div className="profilePage">
      <div className={classes.toolbar} />
      {props.activeUser &&
      props.loggedUser &&
      props.statusActiveUser !== null ? (
        <Profile
          activeUser={props.activeUser}
          status={props.statusActiveUser}
          statusDisabled={statusDisabled}
          publishStatus={props.publishStatus}
        />
      ) : (
        <Loader />
      )}
      <div className={classes.toolbar} />
      {props.logged ? <NewPost /> : null}
      <div className={classes.toolbar} />
      {props.logged ? <PostsList /> : null}
      <div className={classes.toolbar} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activeUser: state.users.activeUser,
    statusActiveUser: state.users.statusActiveUser,
    loggedUser: state.auth.loggedUser,
    logged: state.auth.logged,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    browseUserById: (id) => dispatch(browseUserById(id)),
    publishStatus: (status) => dispatch(publishStatus(status)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
