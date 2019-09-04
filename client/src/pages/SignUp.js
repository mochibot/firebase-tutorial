import React from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../contexts/FirebaseContext';
import SignUpForm from '../components/SignUpForm';

import * as ROUTES from '../constants/routes';

const SignUp = () => {

  return (
    <div>
      <h1>Sign Up</h1>
      <FirebaseContext.Consumer>
        {firebase => <SignUpForm firebase={firebase}/>}
      </FirebaseContext.Consumer>
      <div>Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link></div>
    </div>
  )
};

export default SignUp;