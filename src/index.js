import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { UserProvider } from './context/UserContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
