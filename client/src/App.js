import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { withFirebase } from './contexts/FirebaseContext';
import AuthUserContext from './contexts/AuthUserContext';

import Navigation from './components/Navigation';
import Account from './pages/Account';
import Admin from './components/Admin';
import Landing from './components/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './components/Home';
import PasswordForget from './pages/PasswordForget';

import * as ROUTES from './constants/routes';
import './App.css';

const App = (props) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(response => {
      response ? setAuthUser(response) : setAuthUser(null);
    })
  }, [])

  return (
    <AuthUserContext.Provider value={authUser}>
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.ACCOUNT} component={Account} />
          <Route path={ROUTES.ADMIN} component={Admin} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
        </div>
      </BrowserRouter>
    </AuthUserContext.Provider> 
  );
}

export default withFirebase(App);
