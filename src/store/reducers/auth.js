import {
  LOG_IN_USER,
  THROW_AUTH_EXCEPTION,
  ADD_NEW_POST,
  WRITE_NEW_MESSAGE,
  SAVE_PROFILE_PHOTO,
  FETCH_CAPTCHA,
} from "../actions/actionTypes";

const defaultState = {
  initialization: true,
  logged: false,
  captcha: "",
  loggedUser: null,
  posts: [],
  messages: [],
  photos: null,
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
    case SAVE_PROFILE_PHOTO:
      return {
        ...state,
        photos: action.photos,
      };
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
    case FETCH_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha,
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
