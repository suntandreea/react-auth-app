import React, {useState} from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  logout: () => {
  },
  login: (token) => {
  },
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  //   if (storedUserLoggedInInformation === "1") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  const loginHandler = (token) => {
    // localStorage.setItem("isLoggedIn", "1");
    setToken(token);
  };

  const logoutHandler = () => {
    // localStorage.removeItem("isLoggedIn");
    setToken(null);
  };

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
