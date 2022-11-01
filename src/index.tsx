import React from 'react';
import { render } from 'react-dom';
import 'windi.css';
import { AppRoot } from './App';
import { HomePage } from './pages/Home';
import './styles/index.css';

export const mountApp = (callback?: () => void) => {
  render((
    <React.StrictMode>
      <AppRoot>
        <HomePage />
      </AppRoot>
    </React.StrictMode>
  ), document.getElementById('root'), callback);
};

mountApp();
