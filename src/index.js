import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';

import "./index.css";
import ThemeProviderComponent from './themes/ThemeProviderComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProviderComponent>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProviderComponent>
    </Provider>
  </React.StrictMode>,
);
