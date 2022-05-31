import React from 'react';
import ReactDOM from 'react-dom/client';
import { SessionScoreProvider } from './contexts/useLocalStorage';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionScoreProvider>
      <App />
    </SessionScoreProvider>
  </React.StrictMode>
);
