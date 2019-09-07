import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../contexts/FirebaseContext';
import withAuthorization from '../utilities/withAuthorization';
//import withEmailVerification from '../utilities/withEmailVerification';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';

const UserList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
   
    props.firebase.users().on('value', snapshot => {
      const usersObj = snapshot.val();
      const usersList = Object.keys(usersObj).map(key => {
        return {
          ...usersObj[key],
          uid: key
        }
      })

      setUsers(usersList);
      setIsLoading(false);
    })
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>} 
      {users && users.map(item => (
        <li key={item.uid}>
          <Link to={{
            pathname: `${ROUTES.ADMIN}/${item.uid}`,
            state: { item },
          }}>{item.username}</Link>
        </li>
      ))}
    </div>
  )
};

const condition = authUser => {
  return authUser && !!authUser.roles[ROLES.ADMIN];
}

export default compose(
  //withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(UserList);