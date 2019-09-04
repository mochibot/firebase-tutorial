import React from 'react';
import FirebaseContext from '../contexts/FirebaseContext';
import PasswordChangeForm from '../components/PasswordChangeForm';

const Account = () => {
  return (
    <div>
      <h1>Account</h1>
      <div>Update your password</div>
      <FirebaseContext.Consumer>
        {firebase => <PasswordChangeForm firebase={firebase}/>}
      </FirebaseContext.Consumer>
    </div>
  )
};

export default Account;