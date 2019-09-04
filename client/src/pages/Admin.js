import React, { useState, useEffect } from 'react';
import { withFirebase } from '../contexts/FirebaseContext';
import User from '../components/User';

const Admin = (props) => {
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
    props.firebase.users().off();
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <div>Restricted content. Only users with admin role can view this page</div>
      {isLoading ? <div>Loading...</div> : (
        users.map(item => <User key={item.uid} user={item}/>)
      )}
    </div>
  )
};

export default withFirebase(Admin);