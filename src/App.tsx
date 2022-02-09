import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import { Navbar } from './shared/components';
import routes from './shared/routes';
import PrivateRoute from './shared/routes/PrivateRoute';
import ProtectedRoute from './shared/routes/ProtectedRoute';
import { refreshUser } from './shared/state/user/user.action-creators';
import Spinner from './shared/components/UIElements/Spinner';
import useAuth from './shared/hooks/useAuth';

const App = () => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Spinner />
  ) : (
    <Router>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Routes>
        {routes.map(({ type, path, Element }) => (
          <Route
            key={path}
            path={path}
            element={
              type === 'private' ? (
                <PrivateRoute>
                  <Element />
                </PrivateRoute>
              ) : type === 'protected' ? (
                <ProtectedRoute>
                  <Element />
                </ProtectedRoute>
              ) : (
                <Element />
              )
            }
          />
        ))}
        <Route
          path='/'
          element={<Navigate replace to={isLoggedIn ? '/home' : '/login'} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
