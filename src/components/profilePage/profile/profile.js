import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Contacts from "./contactsList/contacts";
import Status from "./status/status";
import "./profile.css";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function MainContent(props) {
  const classes = useStyles();
  const [img, setImg] = useState(
    "https://images.unsplash.com/photo-1582902244739-e04136cbbe3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGllfGVufDB8fDB8fA%3D%3D"
  );
  if (props.activeUser.photos.large) {
    setImg(props.activeUser.photos.large);
  } else if (props.activeUser.photos.small) {
    setImg(props.activeUser.photos.small);
  }
  return (
    <div className="mainContent">
      <div className="preview" />
      <div className={classes.toolbar} />
      <div className="profile">
        <Grid container spacing={3}>
          <Grid item md={4} xs={5} sm={4}>
            <img src={img} alt="" />
            <Status publishStatus={props.publishStatus} status={props.status} statusDisabled={props.statusDisabled} />
          </Grid>
          <Grid item md={8} xs={7} sm={8}>
            <Typography variant="h4" gutterBottom>
              {props.activeUser.fullName}
            </Typography>
            <Typography paragraph component="p" color="primary" gutterBottom>
              <b>Date of birth:</b> <span>{props.activeUser.userId}</span>
            </Typography>
            <Typography paragraph component="p" color="primary" gutterBottom>
              <b>About me: </b>
              <span>
                {props.activeUser.aboutMe ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
              </span>
            </Typography>

            <Typography paragraph component="p" color="primary" gutterBottom>
              <b>Education: </b> <span>Harvard</span>
            </Typography>
            <Typography paragraph component="p" color="primary" gutterBottom>
              <b>Looking for a Job: </b>
              <span>{props.activeUser.lookingForAJob ? "Yes" : "No"}</span>
              {props.activeUser.lookingForAJob && (
                <span>
                  <b>Job Description: </b>
                  {props.activeUser.lookingForAJobDescription}
                </span>
              )}
            </Typography>
            <Contacts contacts={props.activeUser.contacts} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default MainContent;
