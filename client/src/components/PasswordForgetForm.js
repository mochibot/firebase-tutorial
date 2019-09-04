import React, { useState } from 'react';
import { withFirebase } from '../contexts/FirebaseContext';

const PasswordForgetForm = (props) => {
  const [input, setInput] = useState({
    email: ''
  })

  const [error, setError] = useState('');

  const changeHandler = event => {
    setError('');
    setInput({
      email: event.target.value
    })
  }

  const validateEntry = () => {
    if (!input.email) {
      setError('Email is required');
      return false;
    } else {
      return true;
    }
  }

  const submitHandler = event => {
    event.preventDefault();
    if (validateEntry()) {
      props.firebase.doPasswordReset(input.email)
        .then(response => {
          setInput({
            email: '',
            password: ''
          })
        })
        .catch(error => {
          setError(error.message);
        })
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input name='email' value={input.email} placeholder='Email' onChange={changeHandler}/>
      <button>Submit</button>
      {error && <div>{error}</div>}
    </form>
  )
}

export default withFirebase(PasswordForgetForm);