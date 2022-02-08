import { useAppSelector } from '../state/hooks';
import { loginUser, logoutUser } from '../state/user/user.action-creators';

const useAuth = () => {
  const { token, user } = useAppSelector((state) => state.user);

  return { isLoggedIn: !!token, token, user, loginUser, logoutUser };
};

export default useAuth;
