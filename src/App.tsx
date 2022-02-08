import { ChakraProvider, theme } from '@chakra-ui/react';
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
import { useHttpClient } from './shared/hooks/http-hook';
import useAuth from './shared/hooks/useAuth';
import routes from './shared/routes';
import PrivateRoute from './shared/routes/PrivateRoute';
import ProtectedRoute from './shared/routes/ProtectedRoute';

const App = () => {
  const { isLoggedIn, loginUser } = useAuth();
  const { sendRequest } = useHttpClient();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest('/users/refresh-token');
      dispatch(
        loginUser({
          user: data.payload.user!,
          token: data.payload.accessToken!,
        })
      );
    };
    fetchData();
  }, [sendRequest, loginUser, dispatch]);

  return (
    <Router>
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
    </Router>
  );
};

export default App;
