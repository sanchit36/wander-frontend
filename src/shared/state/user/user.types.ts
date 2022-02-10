import { User } from '../../../user/user.interface';
import { UserActionType } from './user.action-types';

export type UserState = {
  isRefreshing: boolean;
  isLoading: boolean;
  error: any | null;
  user: User | null;
};

export interface LoginStart {
  type: UserActionType.LOGIN_START;
}

export interface LoginUser {
  type: UserActionType.LOGIN_USER;
  payload: {
    user: User;
  };
}

export interface LoginFail {
  type: UserActionType.LOGIN_FAILED;
  payload: {
    error: any;
  };
}

export interface LogoutUser {
  type: UserActionType.LOGOUT_USER;
}

export interface RefreshUserStart {
  type: UserActionType.REFRESH_USER_START;
}

export interface RefreshUser {
  type: UserActionType.REFRESH_USER;
  payload: {
    user: User;
  };
}

export interface RefreshUserFailed {
  type: UserActionType.REFRESH_USER_FAILED;
  payload: {
    error: any;
  };
}
export interface ClearError {
  type: UserActionType.CLEAR_ERROR;
}

export type UserAction =
  | LoginStart
  | LoginUser
  | LoginFail
  | LogoutUser
  | RefreshUserStart
  | RefreshUser
  | RefreshUserFailed
  | ClearError;
