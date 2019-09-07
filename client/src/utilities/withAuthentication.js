import React from 'react';
import AuthUserContext from '../contexts/AuthUserContext';
import { withFirebase } from '../contexts/FirebaseContext';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }
    //using localstorage for authenticated user
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => { 
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        },
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null });
        }
      )
    }
  
    /*
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        }
      );
    }
  */
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withFirebase(WithAuthentication);
};

export default withAuthentication;