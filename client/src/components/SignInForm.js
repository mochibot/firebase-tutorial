import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';


const SignInForm = (props) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState('');

  const validateEntry = () => {
    if (!input.email || !input.password) {
      setError('Missing required fields');
      return false;
    } else {
      return true;
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
      props.firebase.doSignInWithEmailAndPassword(input.email, input.password)
        .then(response => {
          setInput({
            email: '',
            password: ''
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
      <input name='email' value={input.email} placeholder='Email' onChange={changeHandler}/>
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={changeHandler}/>
      <button type='submit'>Submit</button>
      {error && <div>{error}</div>}
    </form>
  )
};

export default withRouter(SignInForm);