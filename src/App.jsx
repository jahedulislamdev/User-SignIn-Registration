import React, { createContext, useEffect, useState } from 'react';
import Navbar from './Components/Navigation/Navbar';
import { Outlet } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import app from './firebase_config';

// Create Context
export const UserCheckerContext = createContext();

const App = () => {
  const [user, setUser] = useState(null); // State for user
  const auth = getAuth(app);
  const [loader, setLoader] = useState(true);
  // createUser 
  const createUser = (email, password) => {
    setLoader(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
  //SigninUser 
  const signInUser = (email, password) => {
    setLoader(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // set a ovserver function 
  useEffect(() => {
    const unSubscrive = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoader(false)
      console.log("ovserving current user inside UseEffect of auth provider", currentUser)
    });
    return () => unSubscrive()
  }, [])
  return (
    <div className="container mx-auto p-4 rounded-sm">
      <UserCheckerContext.Provider value={{ loader, user, setUser, createUser, signInUser }}>
        <Navbar />
        <Outlet />
      </UserCheckerContext.Provider>
    </div>
  );
};

export default App;
