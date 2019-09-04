import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import withAuthentication from './utilities/withAuthentication';

import Navigation from './components/Navigation';
import Account from './pages/Account';
import Admin from './pages/Admin';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import PasswordForget from './pages/PasswordForget';

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

export default withAuthentication(App);
