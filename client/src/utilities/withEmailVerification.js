import React from 'react';
import AuthUserContext from '../contexts/AuthUserContext';
import { withFirebase } from '../contexts/FirebaseContext';

const needsEmailVerification = authUser => {
  return authUser && 
    !authUser.emailVerified && 
    authUser.providerData.map(provider => provider.providerId).includes('password'); 
}

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isSent: false
      }
    }
    
    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({
          isSent: true
        }))
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => 
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    Email confirmation sent: 
                    check your email for a confirmation email. Refresh this page once you have confirmed your email. 
                  </p>
                ) : (
                  <p>
                    Email verification needed
                    Check your email for a confirmation email or send another confirmation email
                  </p>
                )}
                <button onClick={this.onSendEmailVerification} disabled={this.state.isSent}>Send confirmation email</button>
              </div>
            ) : (
            <Component {...this.props}/>
          )}
        </AuthUserContext.Consumer>
      )
    }
  }
  return withFirebase(WithEmailVerification);
}

export default withEmailVerification;