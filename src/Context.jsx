import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from './firebase_config';
export const AuthContext = createContext(null);
const Context = ({ children }) => {
   const [AuthUser, setAuthUser] = useState(null); // State for user
   const auth = getAuth(app)
   // createUser 
   const createUser = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password)
   }
   //SigninUser 
   const signInUser = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password)
   }
   return (
      <AuthContext.Provider value={{ AuthUser, setAuthUser, createUser, signInUser }}>
         {children}
      </AuthContext.Provider>
   );
};

/**
 * create a context and export it.
 * set provider with value 
 * use the auth provider in the main.jsx file 
 * access children in the authprovider component as children and use it in the middle point.
*/
export default Context;