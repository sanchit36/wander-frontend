import { User } from '../../../user/user.interface';
import { ActionType } from './user.action-types';

export type UserState = {
  token: string | null;
  user: User | null;
};

export interface LoginUser {
  type: ActionType.LOGIN_USER;
  payload: {
    token: string;
    user: User;
  };
}

export interface LogoutUser {
  type: ActionType.LOGOUT_USER;
}

export type UserAction = LoginUser | LogoutUser;
