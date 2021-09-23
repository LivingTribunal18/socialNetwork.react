import {
  BROWSE_USERS,
  FETCH_USERS_LOADED,
  LOAD_MORE_USERS,
  FETCH_USER_BY_ID,
  BTN_LOADER,
  CHANGE_USER_STATUS,
} from "./actionTypes";
import axios from "axios";

export function browseUsers() {
  return async (dispatch, getState) => {
    // dispatch(fetchUsersLoaded());
    try {
      const response = await axios.get(
        `https://social-network.samuraijs.com/api/1.0/users?count=${
          getState().users.count
        }`,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchUsers(response.data.items));
    } catch (e) {
      console.log(e);
    }
  };
}

export function browseUserById(id) {
  return async (dispatch) => {
    dispatch(fetchUsersLoaded());
    try {
      const response = await axios.get(
        `https://social-network.samuraijs.com/api/1.0/profile/${id}`
      );

      console.log(response.data);
      const activeUser = response.data;
      dispatch(fetchUserById(activeUser));
    } catch (e) {
      console.log("Error in fetching by id: " + e);
    }
    dispatch(getUserStatus());
  };
}

export function changeFollowing(id, followed) {
  const apiKey = "4fe2e3e7-fdb3-4bd4-beaf-24412c3b62e9";
  return async (dispatch) => {
    dispatch(btnLoader(true));

    let response = {};
    try {
      if (followed) {
        response = await axios.post(
          `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
          {},
          {
            withCredentials: true,
            headers: {
              "API-KEY": apiKey,
            },
          }
        );
      } else {
        response = await axios.delete(
          `https://social-network.samuraijs.com/api/1.0/follow/${id}`,
          {
            withCredentials: true,
            headers: {
              "API-KEY": apiKey,
            },
          }
        );
      }

      const followUser = response.data;
      if (followUser.resultCode === 0) {
        dispatch(browseUsers());
      }
    } catch (e) {
      console.log("Error: " + e);
    }
    dispatch(btnLoader(false));
  };
}

export function getUserStatus() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(
        `https://social-network.samuraijs.com/api/1.0/profile/status/${
          getState().users.activeUser.userId
        }`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      dispatch(fetchStatusUser(response.data || ""));
    } catch (e) {
      console.log(e);
    }
  };
}

export function fetchStatusUser(statusActiveUser) {
  return {
    type: CHANGE_USER_STATUS,
    statusActiveUser,
  };
}

export function fetchUserById(activeUser) {
  return {
    type: FETCH_USER_BY_ID,
    activeUser,
  };
}

export function fetchUsersLoaded() {
  return {
    type: FETCH_USERS_LOADED,
  };
}

export function btnLoader(btnLoader) {
  return {
    type: BTN_LOADER,
    btnLoader,
  };
}

export function increaseCount() {
  return (dispatch, getState) => {
    dispatch(showMoreUsers(getState().users.count + 5));
  };
}

export function showMoreUsers(count) {
  return {
    type: LOAD_MORE_USERS,
    count,
  };
}

export function fetchUsers(users) {
  return {
    type: BROWSE_USERS,
    users,
  };
}
