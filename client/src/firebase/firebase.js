import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';   //using real-time database

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

/*
if want to distinguish between dev and prod database
declare 2 constants: prodConfig, devConfig

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

*/

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  //Auth API
  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);  
  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  //merge auth and DB User API
  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)                   //get user by uid
          .once('value')
          .then(response => {
            const dbUser = response.val();

            if (!dbUser.roles) {
              dbUser.roles = {}
            }

            authUser = {                          //merge with uid and email of authenticated user
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            }

            next(authUser);
          })
      } else {
        fallback();
      }
    })
  }

  //User API
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;