import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Navbar } from './shared/components';
import { LoginPage, SignUpPage } from './user/pages';

const App = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
      </Routes>
    </ChakraProvider>
  </Router>
);

export default App;
