import { ChakraProvider, theme } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './shared/components';
import { AuthContext } from './shared/context/auth.context';
import { useHttpClient } from './shared/hooks/http-hook';
import routes from './shared/routes';
import PrivateRoute from './shared/routes/PrivateRoute';
import ProtectedRoute from './shared/routes/ProtectedRoute';

const App = () => {
  const { isLoggedIn, login } = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest('/users/refresh-token');
      login(data.payload.user!, data.payload.accessToken!);
    };
    fetchData();
  }, [sendRequest, login]);

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
