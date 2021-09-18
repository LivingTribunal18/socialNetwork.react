import React from "react";
import PostItem from "./postItem/postItem";
import { connect } from "react-redux";

function PostsList(props) {
  return (
    <div className="postsList">
      <PostItem posts={props.posts} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.auth.posts,
  };
}

export default connect(mapStateToProps)(PostsList);
