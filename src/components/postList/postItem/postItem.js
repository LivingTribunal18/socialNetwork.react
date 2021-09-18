import React from "react";
import { Grid, Typography, Avatar, Button } from "@material-ui/core";
import "./postItem.css";
import Auxiliary from "../../../hoc/auxiliary";

class PostItem extends React.Component {
  render() {
    return (
      <Auxiliary>
        {this.props.posts.map((post, index) => {
          return (
            <div className="postItem" key={index + Math.random() + Date.now()}>
              <div className="postText">
                <Grid container spacing={3}>
                  <Grid item md={1} className="avatar">
                    <Avatar
                      alt="Remy Sharp"
                      src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1"
                    />
                  </Grid>
                  <Grid item md={11} className="text">
                    <Typography component="p">{post.text}</Typography>
                  </Grid>
                </Grid>
              </div>
              <Button color="default">answer</Button>
            </div>
          );
        })}
      </Auxiliary>
    );
  }
}

export default PostItem;
