import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';

import * as ROUTES from '../constants/routes';

const SignIn = () => {

  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
      <div>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link></div>
      <div>Forgot password? <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link> </div>
    </div>
  )
};

export default SignIn;