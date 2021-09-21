import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Contacts from "./contactsList/contacts";
import Status from "./status/status";
import FloatingActionButtons from "../../UI/actionButton/actionButton";
import TextField from "@mui/material/TextField";
import SwitchInput from "../../UI/switch/switch";
import PropTypes from "prop-types";
import "./profile.css";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  editInput: {
    display: "flex",
    flexDirection: "column",
  },
  span: {
    marginRight: "20px",
    marginBottom: "10px",
  },
}));

function MainContent(props) {
  const classes = useStyles();
  const [hiddenEdit, setHiddenEdit] = useState(true);

  return (
    <div className="mainContent">
      <div className="preview" />
      <div className={classes.toolbar} />
      <div className="profile">
        <Grid container spacing={3}>
          <Grid item md={4} xs={5} sm={4} style={{ position: "relative" }}>
            <img src={props.img} alt="" />
            <Status
              publishStatus={props.publishStatus}
              status={props.status}
              statusDisabled={props.statusDisabled}
            />
            {!props.statusDisabled && (
              <FloatingActionButtons
                uploadPhoto={props.uploadPhoto}
                position={{ top: "150px", right: "5%" }}
                editType={"image"}
              />
            )}
          </Grid>
          <Grid item md={8} xs={7} sm={8} style={{ position: "relative" }}>
            {!props.statusDisabled && (
              <FloatingActionButtons
                uploadPhoto={props.uploadPhoto}
                position={{ top: "0", right: "5%" }}
                editType={"profileInfo"}
                setHiddenEdit={setHiddenEdit}
                hiddenEdit={hiddenEdit}
                triggerFetchingEdition={props.triggerFetchingEdition}
              />
            )}
            <Typography variant="h4" gutterBottom>
              <span>{props.activeUser.fullName}</span>
              {!hiddenEdit && (
                <TextField
                  onChange={(e) =>
                    props.getEditedProfileInfo("fullName", e.target.value)
                  }
                  label="Full Name"
                  size="small"
                  id="outlined-size-small"
                  value={props.editProfile.fullName}
                />
              )}
            </Typography>
            <Typography
              paragraph
              component="div"
              className={classes.editInput}
              color="primary"
              gutterBottom
            >
              <span className={classes.span}>
                <b>About me: </b>
                {props.activeUser.aboutMe ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
              </span>
              {!hiddenEdit && (
                <TextField
                  onChange={(e) =>
                    props.getEditedProfileInfo("aboutMe", e.target.value)
                  }
                  id="outlined-multiline-static"
                  label="About me"
                  multiline
                  rows={3}
                  value={
                    props.editProfile.aboutMe ||
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                  }
                />
              )}
            </Typography>

            <Typography paragraph component="p" color="primary" gutterBottom>
              {props.email && (
                <span>
                  <b>Email: </b> {props.email}
                </span>
              )}
            </Typography>
            <Typography paragraph component="div" color="primary" gutterBottom>
              <span className={classes.span}>
                <b>Looking for a Job: </b>
                {props.activeUser.lookingForAJob ? "Yes" : "No"}
              </span>
              {!hiddenEdit && (
                <SwitchInput
                  getEditedProfileInfo={props.getEditedProfileInfo}
                />
              )}
            </Typography>
            <Typography
              paragraph
              component="div"
              color="primary"
              gutterBottom
              className={classes.editInput}
            >
              <span className={classes.span}>
                <b>Job Description: </b>
                {props.activeUser.lookingForAJobDescription || "No hire"}
              </span>
              {!hiddenEdit && (
                <TextField
                  onChange={(e) =>
                    props.getEditedProfileInfo(
                      "lookingForAJobDescription",
                      e.target.value
                    )
                  }
                  id="outlined-multiline-static"
                  label="Job Description"
                  multiline
                  rows={2}
                  value={
                    props.editProfile.lookingForAJobDescription || "No hire"
                  }
                />
              )}
            </Typography>
            <Contacts
              editProfile={props.editProfile}
              getEditedContactsList={props.getEditedContactsList}
              contacts={props.activeUser.contacts}
              hiddenEdit={hiddenEdit}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

MainContent.propTypes = {
  activeUser: PropTypes.object,
  editProfile: PropTypes.object,
  img: PropTypes.string,
  status: PropTypes.string,
  email: PropTypes.string,
  statusDisabled: PropTypes.bool,
  uploadPhoto: PropTypes.func,
  publishStatus: PropTypes.func,
  getEditedProfileInfo: PropTypes.func,
  getEditedContactsList: PropTypes.func,
  triggerFetchingEdition: PropTypes.func,
};

export default MainContent;
