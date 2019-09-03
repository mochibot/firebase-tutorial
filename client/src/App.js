import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

import Account from './components/Account';
import Admin from './components/Admin';
import Landing from './components/Landing';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PasswordForget from './components/PasswordForget';
import Home from './components/Home';

import * as ROUTES from './constants/routes';
import './App.css';

const App = () => {
  return (
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
  );
}

export default App;
