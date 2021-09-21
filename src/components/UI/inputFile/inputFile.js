import React from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import "./inputFile.css";
import PropTypes from "prop-types";

function InputFile(props) {
  function showFile(element) {
    let label = document.getElementById("file-label");
    let labelVal = label.innerHTML;

    let fileName = "";
    if (element.target.value && element.target.files[0]) {
      fileName = element.target.value.split("\\").pop();

      props.uploadPhoto(element.target.files[0]);
    }

    if (fileName) {
      label.classList.add("has-file");
      document.getElementById("js-fileName").innerHTML = fileName;
    } else {
      label.classList.remove("has-file");
      label.innerHTML = labelVal;
    }

    setTimeout(() => {
      props.setHidden(true);
      clearTimeout();
    }, 1500);
  }

  return (
    <div className="form-group">
      <input
        type="file"
        onChange={(e) => {
          showFile(e);
        }}
        name="file"
        id="file"
        className="input-file"
      />
      <label
        htmlFor="file"
        id="file-label"
        className="btn-tertiary js-labelFile"
        style={props.position}
      >
        <FileUploadOutlinedIcon />
        <span className="js-fileName" id="js-fileName">
          Choose a file
        </span>
      </label>
    </div>
  );
}

export default InputFile;

InputFile.propTypes = {
  uploadPhoto: PropTypes.func,
  setHidden: PropTypes.func,
  position: PropTypes.object,
};
