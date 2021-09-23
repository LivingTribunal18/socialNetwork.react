import {
  BROWSE_USERS,
  FETCH_USERS_LOADED,
  FETCH_USER_BY_ID,
  LOAD_MORE_USERS,
  FOLLOW_HANDLER,
  BTN_LOADER,
  CHANGE_USER_STATUS,
} from "../actions/actionTypes";

const defaultState = {
  users: [],
  activeUser: null,
  statusActiveUser: "",
  count: 10,
  loading: true,
  btnLoader: false,
};

export default function users(state = defaultState, action) {
  switch (action.type) {
    case BROWSE_USERS:
      return {
        ...state,
        loading: false,
        users: [...action.users],
      };
    case FETCH_USERS_LOADED:
      return {
        ...state,
        loading: true,
      };
    case BTN_LOADER:
      return {
        ...state,
        btnLoader: action.btnLoader,
      };
    case FETCH_USER_BY_ID:
      return {
        ...state,
        loading: false,
        activeUser: action.activeUser,
      };
    case CHANGE_USER_STATUS:
      return {
        ...state,
        loading: false,
        statusActiveUser: action.statusActiveUser,
      };
    case LOAD_MORE_USERS:
      return {
        ...state,
        count: action.count,
      };
    case FOLLOW_HANDLER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
