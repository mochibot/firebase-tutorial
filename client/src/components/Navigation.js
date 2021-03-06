import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../contexts/FirebaseContext';
import AuthUserContext from '../contexts/AuthUserContext';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';

const Navigation = ({ firebase }) => {
  
  const logout = () => {
    firebase.doSignOut();
  }

  return (
    <AuthUserContext.Consumer>
      {authUser => authUser ? <AuthLinks authUser={authUser} logout={logout} /> : <NonAuthLinks />}
    </AuthUserContext.Consumer>
  )
};

const NonAuthLinks = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
    </ul>
  )
}

const AuthLinks = (props) => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {!!props.authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <Link onClick={props.logout} to={ROUTES.SIGN_IN}>Sign Out</Link>
      </li>
    </ul>
  )
}

export default withFirebase(Navigation);