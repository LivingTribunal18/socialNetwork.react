import {
  LOG_IN_USER,
  THROW_AUTH_EXCEPTION,
  INSERT_LOGGED_USER,
  ADD_NEW_POST,
  WRITE_NEW_MESSAGE,
  CHANGE_PROFILE_STATUS,
} from "../actions/actionTypes";

const defaultState = {
  initialization: true,
  logged: false,
  loggedUser: null,
  // status: "",
  posts: [],
  errors: null,
};

export default function auth(state = defaultState, action) {
  switch (action.type) {
    case LOG_IN_USER:
      return {
        ...state,
        initialization: action.initialization,
        logged: action.logged,
        loggedUser: action.loggedUser,
      };
    // case INSERT_LOGGED_USER:
    //   return {
    //     ...state,
    //     loggedUser: action.obj,
    //   };
    // case CHANGE_PROFILE_STATUS:
    //   return {
    //     ...state,
    //     status: action.status,
    //   };
    case ADD_NEW_POST:
      return {
        ...state,
        posts: [...state.posts, action.post],
      };
    case WRITE_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case THROW_AUTH_EXCEPTION:
      return {
        ...state,
        errors: action.e,
      };
    default:
      return state;
  }
}
