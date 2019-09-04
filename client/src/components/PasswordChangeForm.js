import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../contexts/FirebaseContext';
import * as ROUTES from '../constants/routes';


const PasswordChangeForm = (props) => {
  const [input, setInput] = useState({
    password: '',
    passwordConfirm: '',
  })

  const [error, setError] = useState('');

  const validateEntry = () => {
    if (!input.password || !input.passwordConfirm) {
      setError('Missing required fields');
      return false;
    } else {
      if (input.password !== input.passwordConfirm) {
        setError('Passwords need to match');
        return false;
      } else {
        return true;
      }
    }
  }

  const changeHandler = event => {
    setError('');
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  }

  const submitHandler = event => {
    event.preventDefault();
    if (validateEntry()) {
      props.firebase.doPasswordUpdate(input.password)
        .then(response => {
          setInput({
            password: '',
            passwordConfirm: '',
          })
          props.history.push(ROUTES.HOME)
        })
        .catch(error => {
          setError(error.message);
        })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={changeHandler}/>
      <input type='password' name='passwordConfirm' value={input.passwordConfirm} placeholder='Confirm password' onChange={changeHandler}/>
      <button type='submit'>Submit</button>
      {error && <div>{error}</div>}
    </form>
  )
};

export default compose(withRouter, withFirebase)(PasswordChangeForm);