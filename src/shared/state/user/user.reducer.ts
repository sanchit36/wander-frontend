import { UserActionType } from './user.action-types';
import { UserAction, UserState } from './user.types';

const initialState: UserState = {
  isRefreshing: false,
  isLoading: false,
  error: null,
  user: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionType.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case UserActionType.LOGIN_USER:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: action.payload.user,
      };
    case UserActionType.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        user: null,
      };
    case UserActionType.LOGOUT_USER:
      return {
        ...state,
        isLoading: false,
        error: null,
        user: null,
      };
    case UserActionType.REFRESH_USER_START:
      return {
        ...state,
        isRefreshing: true,
        error: null,
      };
    case UserActionType.REFRESH_USER:
      return {
        ...state,
        isRefreshing: false,
        error: null,
        user: action.payload.user,
      };
    case UserActionType.REFRESH_USER_FAILED:
      return {
        ...state,
        isRefreshing: false,
        error: null,
        user: null,
      };
    case UserActionType.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
