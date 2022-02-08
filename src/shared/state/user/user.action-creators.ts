import { AppDispatch } from '../store';
import { ActionType } from './user.action-types';
import { LoginUser } from './user.types';

export const loginUser = (payload: LoginUser['payload']) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ActionType.LOGIN_USER,
      payload: payload,
    });
  };
};

export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ActionType.LOGOUT_USER,
    });
  };
};
