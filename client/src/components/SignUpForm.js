import React, { useState } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../contexts/FirebaseContext';
import * as ROUTES from '../constants/routes';
import * as ROLES from '../constants/roles';


const SignUpForm = (props) => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    isAdmin: false
  })

  const [error, setError] = useState('');

  const validateEntry = () => {
    if (!input.username || !input.email || !input.password || !input.passwordConfirm) {
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

  const checkBoxHandler = event => {
    setError('');
    setInput({
      ...input,
      [event.target.name]: event.target.checked
    })
  }

  const submitHandler = event => {
    event.preventDefault();
    if (validateEntry()) {
      const roles = {};
      
      if (input.isAdmin) {
        roles[ROLES.ADMIN] = ROLES.ADMIN;
      }
      
      props.firebase.doCreateUserWithEmailAndPassword(input.email, input.password)
        .then(authUser => {
          return props.firebase
            .user(authUser.user.uid)
            .set({
              username: input.username,
              email: input.email,
              roles, 
            })
        })
        .then(() => {
          return props.firebase.doSendEmailVerification();
        })
        .then(() => {  
          setInput({
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            isAdmin: false
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
      <input name='username' value={input.username} placeholder='Username' onChange={changeHandler}/>
      <input name='email' value={input.email} placeholder='Email' onChange={changeHandler}/>
      <input type='password' name='password' value={input.password} placeholder='Password' onChange={changeHandler}/>
      <input type='password' name='passwordConfirm' value={input.passwordConfirm} placeholder='Confirm password' onChange={changeHandler}/>
      <label><input type='checkbox' name='isAdmin' checked={input.isAdmin} onChange={checkBoxHandler}/> Admin?</label>
      <button type='submit'>Submit</button>
      {error && <div>{error}</div>}
    </form>
  )
};

export default compose(withRouter, withFirebase)(SignUpForm);