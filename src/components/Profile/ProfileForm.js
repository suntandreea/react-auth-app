import classes from './ProfileForm.module.css';
import {useContext, useRef, useState} from 'react';
import AuthContext from '../../store/auth-context';
import {useHistory} from 'react-router-dom';

const ProfileForm = () => {

  const history = useHistory();
  const newPassRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPass = newPassRef.current.value;

    // validation should be here

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCd5CFD0eel51Hti6Wi1NyvoNbAKNaHxpY', {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
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

      history.replace('/');

    }).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPassRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>{isLoading ? 'Changing Password ...' : 'Change Password'}</button>
      </div>
      {error && <span className={classes.error}>{error}</span>}
    </form>
  );
}

export default ProfileForm;
