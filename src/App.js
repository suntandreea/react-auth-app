import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // lasata intentionat fara dependinte, ca sa nu faca infinite loop
    // si sa ruleze o singura data, la incarcarea paginii

    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
  }}>
      {/* acum, toti copii si subcopii au acces la contextul de auth */}
      <MainHeader/>
      <main>
        { /* ATENTIE! nu vrem sa folosim context peste tot */}
        { /* pastram props cald avem nevoie de datele pasate */}
        { /* fix in componenta aia, nu in copii ei! */}
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
