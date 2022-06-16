import React from "react";

// valoarea default

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}
});

export default AuthContext;
