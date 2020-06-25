import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Enable concurrent mode
ReactDOM.unstable_createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
