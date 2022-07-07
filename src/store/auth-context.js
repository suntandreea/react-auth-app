import React, {useCallback, useEffect, useState} from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  logout: () => {
  },
  login: (token, expirationTime) => {
  },
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); // now, in milliseconds
  const adjustedExpirationTime = new Date(expirationTime).getTime(); // usually some time in the future
  return adjustedExpirationTime - currentTime;
};

const retieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expiration');

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    // 1 min in milliseconds
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime
  }
};

export const AuthContextProvider = (props) => {
  const tokenData = retieveStoredToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  },[]);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logout: logoutHandler,
    login: loginHandler
  };

  return (
    <AuthContext.Provider
      value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
