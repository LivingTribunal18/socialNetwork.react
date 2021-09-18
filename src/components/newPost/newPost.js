import React from "react";
import { Typography, Button } from "@material-ui/core";
import "./newPost.css";
import Icon from "@material-ui/core/Icon";
import { connect } from "react-redux";
import { publishPost } from "../../store/actions/auth";

class NewPost extends React.Component {
  state = {
    newPost: {},
  };

  createPostHandler = (event) => {
    event.preventDefault();

    this.props.publishPost(this.state.newPost);
  };

  changeHandler = (event) => {
    let postText = event.target.value;
    let post = {
      text: postText,
      date: Date.now(),
      username: "",
    };

    this.setState({
      newPost: post,
    });
  };

  render() {
    return (
      <div className="newPost">
        <Typography variant="h4" gutterBottom>
          New post
        </Typography>
        <div className="form">
          <form autoComplete="off">
            <textarea
              onChange={(event) => {
                this.changeHandler(event);
              }}
              rows={5}
              placeholder="Share your ideas"
            />
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={this.createPostHandler}
            >
              Post
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     posts: state.newPost.post,
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    publishPost: (post) => dispatch(publishPost(post)),
  };
}

export default connect(null, mapDispatchToProps)(NewPost);
