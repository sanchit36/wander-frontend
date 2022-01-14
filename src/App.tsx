import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './shared/components';
import { AuthProvider } from './shared/context/auth.context';
import { LoginPage, SignUpPage } from './user/pages';

const App = () => (
  <AuthProvider>
    <Router>
      <ChakraProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
        </Routes>
      </ChakraProvider>
    </Router>
  </AuthProvider>
);

export default App;
