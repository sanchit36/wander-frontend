import { ChakraProvider, theme } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './shared/components';
import { AuthContext } from './shared/context/auth.context';
import { useHttpClient } from './shared/hooks/http-hook';
import routes from './shared/routes';
import PrivateRoute from './shared/routes/PrivateRoute';
import ProtectedRoute from './shared/routes/ProtectedRoute';

const App = () => {
  const { login } = useContext(AuthContext);
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
        </Routes>
      </ChakraProvider>
    </Router>
  );
};

export default App;
