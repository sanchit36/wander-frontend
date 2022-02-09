import { ActionType } from './user.action-types';
import { UserAction, UserState } from './user.types';

const initialState: UserState = {
  isRefreshing: false,
  isLoading: false,
  error: null,
  user: null,
};

const userReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case ActionType.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionType.LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
      };
    case ActionType.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        user: null,
      };
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: null,
      };
    case ActionType.REFRESH_USER_START:
      return {
        ...state,
        isRefreshing: true,
        error: null,
      };
    case ActionType.REFRESH_USER:
      return {
        ...state,
        isRefreshing: false,
        error: null,
        user: action.payload.user,
      };
    case ActionType.REFRESH_USER_FAILED:
      return {
        ...state,
        isRefreshing: false,
        error: null,
        user: null,
      };
    case ActionType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
