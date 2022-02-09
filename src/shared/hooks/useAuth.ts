import { useAppSelector } from '../state/hooks';
import { loginUser, logoutUser } from '../state/user/user.action-creators';

const useAuth = () => {
  const { user, error, isLoading, isRefreshing } = useAppSelector(
    ({ user }) => user
  );

  return {
    isLoggedIn: !!user,
    user,
    error,
    isLoading,
    isRefreshing,
    loginUser,
    logoutUser,
  };
};

export default useAuth;
