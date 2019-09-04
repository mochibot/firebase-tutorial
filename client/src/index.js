import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Firebase from './firebase/Firebase';
import FirebaseContext from './contexts/FirebaseContext';
import App from './App';

import * as serviceWorker from './serviceWorker';

require('dotenv').config()

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
