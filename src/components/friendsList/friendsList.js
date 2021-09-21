import React from "react";
import "./friendsList.css";
import { List } from "@material-ui/core";
import FriendItem from "./friendItem/friendItem";

class FriendsList extends React.Component {
  state = {
    friendsList: [
      {
        name: "Ali Connors",
        linkAvatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        topic: "Brunch this weekend?",
        answer: " — I'll be in your neighborhood doing…",
      },
      {
        name: "Travis Howard",
        linkAvatar:
          "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        topic: "Summer BBQ",
        answer: " — Wish I could come, but I'm out of…",
      },
      {
        name: "Sandra Adams",
        linkAvatar:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
        topic: "Oui Oui",
        answer: " — Do you have Paris recommendations?",
      },
    ],
  };

  render() {
    return (
      <List className="root">
        {}
        <FriendItem friends={this.state.friendsList} />
      </List>
    );
  }
}

export default FriendsList;
