import {
  LOG_IN_USER,
  THROW_AUTH_EXCEPTION,
  WRITE_NEW_MESSAGE,
  ADD_NEW_POST,
} from "./actionTypes";
import axios from "axios";

const apiKey = "4fe2e3e7-fdb3-4bd4-beaf-24412c3b62e9";

export function logIn(email, password, rememberMe) {
  return async (dispatch) => {
    dispatch(loggedIn(true, false, null));
    try {
      const response = await axios.post(
        "https://social-network.samuraijs.com/api/1.0/auth/login",
        {
          email,
          password,
          rememberMe,
        }
      );
      console.log(response);
      if (response.data.resultCode === 0) {
        dispatch(errorOccurred(null));
        dispatch(loggedIn(false, true, response.data));
      } else {
        dispatch(errorOccurred(response.data.messages));
      }
    } catch (e) {
      dispatch(errorOccurred(e));
      console.log(e);
    }
  };
}

export function checkLogged() {
  return async (dispatch) => {
    dispatch(loggedIn(true, false, null));
    try {
      const response = await axios.get(
        `https://social-network.samuraijs.com/api/1.0/auth/me`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.resultCode === 0) {
        dispatch(errorOccurred(null));
        dispatch(loggedIn(false, true, response.data));
      } else {
        dispatch(loggedIn(false, false, null));
      }
    } catch (e) {
      dispatch(errorOccurred(e));
      console.log(e);
    }
  };
}

export function logOut() {
  return async (dispatch) => {
    dispatch(loggedIn(true, true, null));
    try {
      const response = await axios.delete(
        `https://social-network.samuraijs.com/api/1.0/auth/login`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.resultCode === 0) {
        dispatch(errorOccurred(null));
        dispatch(loggedIn(false, false, response.data));
      } else {
        dispatch(loggedIn(false, false, null));
      }
    } catch (e) {
      dispatch(errorOccurred(e));
      console.log(e);
    }
  };
}

export function publishStatus(status) {
  return async () => {
    try {
      await axios.put(
        `https://social-network.samuraijs.com/api/1.0/profile/status`,
        {
          status: status,
        },
        {
          withCredentials: true,
          headers: {
            "API-KEY": apiKey,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
}

export function publishPost(post) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `https://social-network.samuraijs.com/api/1.0/profile/status`,
        {
          post,
        },
        {
          withCredentials: true,
          headers: {
            "API-KEY": apiKey,
          },
        }
      );
      dispatch(fetchPosts(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export function loggedIn(initialization, logged, loggedUser) {
  return {
    type: LOG_IN_USER,
    initialization,
    logged,
    loggedUser,
  };
}

export function errorOccurred(e) {
  return {
    type: THROW_AUTH_EXCEPTION,
    e,
  };
}

export function writeNewMessage(message) {
  return {
    type: WRITE_NEW_MESSAGE,
    message,
  };
}

export function fetchPosts(post) {
  return {
    type: ADD_NEW_POST,
    post,
  };
}
