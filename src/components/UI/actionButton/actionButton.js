import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import InputFile from "../inputFile/inputFile";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  btn: {
    position: "absolute",
    width: 45,
    height: 45,
  },
}));

export default function FloatingActionButtons(props) {
  const classes = useStyles();
  const [hidden, setHidden] = useState(true);
  let renderBtn = (
    <Fab
      color="secondary"
      className={classes.btn}
      style={props.position}
      onClick={() => {
        props.editType !== "image"
          ? props.setHiddenEdit(false)
          : setHidden(false);
      }}
    >
      {props.editType === "image" ? <CloudUploadOutlinedIcon /> : <EditIcon />}
    </Fab>
  );

  if (!hidden && props.editType === "image") {
    renderBtn = (
      <InputFile
        setHidden={setHidden}
        uploadPhoto={props.uploadPhoto}
        position={props.position}
      />
    );
  } else if (!props.hiddenEdit && props.editType === "profileInfo") {
    renderBtn = (
      <Fab
        color="primary"
        className={classes.btn}
        style={props.position}
        onClick={() => {
          props.setHiddenEdit(true);
          props.triggerFetchingEdition();
        }}
      >
        <SaveAltIcon />
      </Fab>
    );
  }

  return renderBtn;
}

FloatingActionButtons.propTypes = {
  position: PropTypes.object,
  editType: PropTypes.string,
  hiddenEdit: PropTypes.bool,
  setHiddenEdit: PropTypes.func,
  uploadPhoto: PropTypes.func,
  triggerFetchingEdition: PropTypes.func,
};
