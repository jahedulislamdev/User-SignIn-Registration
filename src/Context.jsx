import React, { createContext, useState } from 'react';
export const AuthContext = createContext(null);
const Context = ({ children }) => {
   const [AuthUser, setAuthUser] = useState(null); // State for user
   return (
      <AuthContext.Provider value={{ AuthUser, setAuthUser }}>
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