// this contexet componet is unvalid !!! I haven't use it .
import React, { createContext, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from './firebase_config';
export const AuthContext = createContext(null);
const auth = getAuth(app);
const Context = ({ children }) => {
   const [AuthUser, setAuthUser] = useState(null); // State for user

   const contxtInfo = "hello"
   return (
      <AuthContext.Provider value={contxtInfo}>
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