import React from 'react';

const User = (props) => {
  return (
    <div>
      <div>ID: {props.user.uid}</div>
      <div>Email: {props.user.email}</div>
      <div>Username: {props.user.username}</div>
    </div>
  )
}

export default User;