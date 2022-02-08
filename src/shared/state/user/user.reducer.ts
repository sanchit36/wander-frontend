import { ActionType } from './user.action-types';
import { UserAction, UserState } from './user.types';

const initialState: UserState = {
  token: null,
  user: null,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case ActionType.LOGOUT_USER:
      return {
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;
