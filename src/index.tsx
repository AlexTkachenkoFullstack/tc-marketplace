import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { StrictMode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  // <StrictMode>
  <GoogleOAuthProvider clientId="160491221513-tb59k912vnbiraoj1hlor3o42hnnfn79.apps.googleusercontent.com">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
  // </StrictMode>
);
