import {UPDATE_USER} from "../actions/user-actions";

export default function userReducer(state = {}, {type, payload}) {
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        userId: payload.userId
      };
    default:
      return state;
  }
}