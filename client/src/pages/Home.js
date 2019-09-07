import React from 'react';
import withAuthorization from '../utilities/withAuthorization';
//import { compose } from 'recompose';
//import withEmailVerification from '../utilities/withEmailVerification';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>This page is only visible to signed in user</div>
    </div>
  )
};

const condition = authUser => !!authUser;

/*
export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Home);
*/

export default withAuthorization(condition)(Home);