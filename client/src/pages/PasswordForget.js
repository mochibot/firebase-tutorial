import React from 'react';
import FirebaseContext from '../contexts/FirebaseContext';
import PasswordForgetForm from '../components/PasswordForgetForm';

const PasswordForget = () => {
  return (
    <div>
      <h1>Forgot password? </h1>
      <FirebaseContext.Consumer>
        {firebase => <PasswordForgetForm firebase={firebase}/>}
      </FirebaseContext.Consumer>
    </div>
  )
};

export default PasswordForget;