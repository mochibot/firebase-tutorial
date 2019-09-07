import React from 'react';
//import { compose } from 'recompose';
import withAuthorization from '../utilities/withAuthorization';
//import withEmailVerification from '../utilities/withEmailVerification';
import AuthUserContext from '../contexts/AuthUserContext';
import PasswordChangeForm from '../components/PasswordChangeForm';

const Account = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
            <h1>Account: {authUser.email}</h1>
            <div>Update your password</div>
            <PasswordChangeForm />
        </div>
      )}
    </AuthUserContext.Consumer>
  )
};

const condition = authUser => !!authUser;

/*
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Account);
*/

export default withAuthorization(condition)(Account);