import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../contexts/FirebaseContext';
import withAuthorization from '../utilities/withAuthorization';
//import withEmailVerification from '../utilities/withEmailVerification';
import * as ROLES from '../constants/roles';


const UserItem = (props) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    setIsLoading(true);
    
    props.firebase
      .user(props.match.params.id)
      .on('value', response => {
        console.log(response.val());
        setUser(response.val());
        setIsLoading(false);
      })
  }, [])

  const sendPasswordResetEmail = () => {
    props.firebase.doPasswordReset(user.email);
  }

  return (
    <div>
      <h2>User ID: {props.match.params.id}</h2>
      {isLoading && <div>Loading...</div>} 
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={sendPasswordResetEmail}>Reset password</button>
        </div>  
      )}
    </div>
  )
}

const condition = authUser => {
  return authUser && !!authUser.roles[ROLES.ADMIN];
}

export default compose(
  //withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(UserItem);