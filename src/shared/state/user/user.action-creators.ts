import api from '../../../api';
import { AppDispatch } from '../store';
import { ActionType } from './user.action-types';

interface userCredentials {
  email: string;
  password: string;
}

export const loginUser = (userCredentials: userCredentials) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionType.LOGIN_START,
    });

    try {
      const response = await api.post('/users/login', userCredentials);
      const data = response.data;

      // Storing the token to localStorage
      localStorage.setItem('xid', data.payload.accessToken);

      dispatch({
        type: ActionType.LOGIN_USER,
        payload: { user: data.payload.user },
      });
    } catch (error: any) {
      let errorData = error && error.response && error.response.data;
      dispatch({
        type: ActionType.LOGIN_FAILED,
        payload: { error: errorData },
      });
    }
  };
};

export const refreshUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: ActionType.LOGIN_START,
    });

    try {
      const response = await api.get('/users/refresh-token');
      const data = response.data;

      // Storing the token to localStorage
      localStorage.setItem('xid', data.payload.accessToken);

      dispatch({
        type: ActionType.LOGIN_USER,
        payload: { user: data.payload.user },
      });
    } catch (error: any) {
      let errorData = error && error.response && error.response.data;
      dispatch({
        type: ActionType.LOGIN_FAILED,
        payload: { error: errorData },
      });
    }
  };
};

export const clearError = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: ActionType.CLEAR_ERROR,
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
