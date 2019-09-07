import React from 'react';
import { Route } from 'react-router-dom';
import { compose } from 'recompose';
import withAuthorization from '../utilities/withAuthorization';
import { withFirebase } from '../contexts/FirebaseContext';
import UserList from '../components/UserList';
import UserItem from '../components/UserItem';
import * as ROLES from '../constants/roles';
import * as ROUTES from '../constants/routes';

const Admin = (props) => {

  return (
    <div>
      <div>Restricted content - accessible by every signed in admin user.</div>
      <Route exact path={ROUTES.ADMIN} component={UserList}/>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem}/>
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
)(Admin);