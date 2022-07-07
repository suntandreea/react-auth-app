import {useContext, useRef, useState} from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

const AuthForm = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    const emailRef = useRef();
    const passRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const switchAuthModeHandler = () => {
      setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
      event.preventDefault();

      const enteredEmail = emailRef.current.value;
      const enteredPass = passRef.current.value;

      // DOCUMENTATIE FIREBASE AUTH REST API: https://firebase.google.com/docs/reference/rest/auth

      setIsLoading(true);
      let url;
      if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCd5CFD0eel51Hti6Wi1NyvoNbAKNaHxpY';
      } else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCd5CFD0eel51Hti6Wi1NyvoNbAKNaHxpY';
      }

      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPass,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        setIsLoading(false);

        if (response.ok) {
          return response.json();
          // returns the response without nested promise
        } else {
          return response.json().then(data => {
            throw new Error(data.error.message);
            // this rejects the promise
          });
        }
      }).then((data) => {
        // converts sec to milliseconds
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000 ));
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.replace('/');
      }).catch((error) => {
        setError(error.message);
      });
    };

    return (
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input ref={emailRef} type='email' id='email' required />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input ref={passRef} type='password' id='password' required />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}{isLoading && ' ...'}</button>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
          {error && <span className={classes.error}>{error}</span>}
        </form>
      </section>
    );
  }
;

export default AuthForm;
