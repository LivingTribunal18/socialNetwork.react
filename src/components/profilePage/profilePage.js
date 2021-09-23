import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "./profile/profile";
import NewPost from "../newPost/newPost";
import PostsList from "../postList/postsList";
import Loader from "../UI/loader/loader";

import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { browseUserById } from "../../store/actions/users";
import {
  fetchEditedProfile,
  errorOccurred,
  publishStatus,
  uploadPhoto,
} from "../../store/actions/auth";
import ErrorAlert from "../errors/error";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function ProfilePage(props) {
  const classes = useStyles();
  let location = useLocation();
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [editProfile, setEditProfile] = useState({
    userId: null,
    fullName: null,
    aboutMe: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null,
    },
  });
  const [email, setEmail] = useState(
    !props.match.params.id ? props.loggedUser.data.email : ""
  );
  const [img, setImg] = useState(
    "https://images.unsplash.com/photo-1582902244739-e04136cbbe3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGllfGVufDB8fDB8fA%3D%3D"
  );

  function getEditedProfileInfo(type, info) {
    let editedInfo = { ...editProfile };
    editedInfo[type] = info;
    setEditProfile(editedInfo);
  }

  function getEditedContactsList(type, link) {
    let editedContactsList = { ...editProfile };
    editedContactsList.contacts[type] = link;
    setEditProfile(editedContactsList);
  }

  function triggerFetchingEdition() {
    props.fetchEditedProfile(editProfile);
  }

  useEffect(() => {
    let loadUser;
    if (props.match.params.id) {
      loadUser = props.match.params.id;
      setStatusDisabled(true);
    } else {
      loadUser = props.loggedUser.data.id || props.loggedUser.data.userId;
      setStatusDisabled(false);
    }
    props.browseUserById(loadUser);
  }, [location.pathname]);

  useEffect(() => {
    if (!statusDisabled && props.photos) {
      setImg(props.photos.large);
    } else if (props.activeUser) {
      setImg(
        props.activeUser.photos.large ||
          "https://images.unsplash.com/photo-1582902244739-e04136cbbe3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGllfGVufDB8fDB8fA%3D%3D"
      );
    }
    if (props.activeUser) {
      setEditProfile({
        userId: props.loggedUser.data.id || props.loggedUser.data.userId,
        fullName: props.activeUser.fullName,
        aboutMe: props.activeUser.aboutMe || "about me",
        lookingForAJob: props.activeUser.lookingForAJob || "No",
        lookingForAJobDescription:
          props.activeUser.lookingForAJobDescription || "Empty",
        contacts: {
          facebook: props.activeUser.contacts.facebook || "https://google.com",
          website: props.activeUser.contacts.website || "https://google.com",
          vk: props.activeUser.contacts.vk || "https://google.com",
          twitter: props.activeUser.contacts.twitter || "https://google.com",
          instagram:
            props.activeUser.contacts.instagram || "https://google.com",
          youtube: props.activeUser.contacts.youtube || "https://google.com",
          github: props.activeUser.contacts.github || "https://google.com",
          mainLink: props.activeUser.contacts.mainLink || "https://google.com",
        },
      });
    }
  }, [props.activeUser, props.photos]);

  return (
    <div className="profilePage">
      {props.errors && <ErrorAlert errors={props.errors} />}
      <div className={classes.toolbar} />

      {!props.loading && props.activeUser && props.loggedUser ? (
        <>
          <Profile
            activeUser={props.activeUser}
            status={props.statusActiveUser}
            statusDisabled={statusDisabled}
            publishStatus={props.publishStatus}
            email={email}
            img={img}
            editProfile={editProfile}
            uploadPhoto={props.uploadPhoto}
            getEditedProfileInfo={getEditedProfileInfo}
            getEditedContactsList={getEditedContactsList}
            triggerFetchingEdition={triggerFetchingEdition}
          />
          <div className={classes.toolbar} />
          {props.logged && !statusDisabled && <NewPost />}
          <div className={classes.toolbar} />
          {props.logged && !statusDisabled && <PostsList />}
          <div className={classes.toolbar} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    activeUser: state.users.activeUser,
    statusActiveUser: state.users.statusActiveUser,
    loggedUser: state.auth.loggedUser,
    logged: state.auth.logged,
    loading: state.users.loading,
    photos: state.auth.photos,
    errors: state.auth.errors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    browseUserById: (id) => dispatch(browseUserById(id)),
    publishStatus: (status) => dispatch(publishStatus(status)),
    uploadPhoto: (photo) => dispatch(uploadPhoto(photo)),
    errorOccurred: (e) => dispatch(errorOccurred(e)),
    fetchEditedProfile: (profileObj) =>
      dispatch(fetchEditedProfile(profileObj)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
