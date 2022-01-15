import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './shared/context/auth.context';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ColorModeScript />
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
