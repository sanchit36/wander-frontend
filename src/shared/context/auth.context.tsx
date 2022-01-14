import { createContext, useCallback, useReducer } from 'react';
import { User } from '../../user/user.interface';

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

type AuthState = {
  token: string | null;
  user: User | null;
};

type AuthAction =
  | {
      type: 'LOGIN';
      payload: {
        token: string;
        user: User;
      };
    }
  | { type: 'LOGOUT' };

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [{ token, user }, dispatch] = useReducer(reducer, {
    token: null,
    user: null,
  });

  const login = useCallback((user: User, token: string) => {
    dispatch({ type: 'LOGIN', payload: { token, user } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
