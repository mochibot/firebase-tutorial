import React, { useState } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../contexts/FirebaseContext';
import * as ROUTES from '../constants/routes';

const SignInWithGoogle = (props) => {
  const [error, setError] = useState('')

  const submitHandler = event => {
    event.preventDefault();
    props.firebase.doSignInWithGoogle()
      .then(response => {
        return props.firebase
          .user(response.user.uid)
          .set({
            username: response.user.displayName,
            email: response.user.email,
            roles: {}
          })
      })
      .then(() => {
        setError('');
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setError(error.message);
      })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <button type='submit'>Sign in with Google</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  )
}

export default compose(withRouter, withFirebase)(SignInWithGoogle);