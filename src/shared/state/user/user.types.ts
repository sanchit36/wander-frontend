import { User } from '../../../user/user.interface';
import { ActionType } from './user.action-types';

export type UserState = {
  isRefreshing: boolean;
  isLoading: boolean;
  error: any | null;
  user: User | null;
};

export interface LoginStart {
  type: ActionType.LOGIN_START;
}

export interface LoginUser {
  type: ActionType.LOGIN_USER;
  payload: {
    user: User;
  };
}

export interface LoginFail {
  type: ActionType.LOGIN_FAILED;
  payload: {
    error: any;
  };
}

export interface LogoutUser {
  type: ActionType.LOGOUT_USER;
}

export interface RefreshUserStart {
  type: ActionType.REFRESH_USER_START;
}

export interface RefreshUser {
  type: ActionType.REFRESH_USER;
  payload: {
    user: User;
  };
}

export interface RefreshUserFailed {
  type: ActionType.REFRESH_USER_FAILED;
  payload: {
    error: any;
  };
}
export interface ClearError {
  type: ActionType.CLEAR_ERROR;
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
