import React, { useContext } from 'react';
import { UserCheckerContext } from '../App';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
   const { user, loader } = useContext(UserCheckerContext);
   if (loader) {
      return <div className='flex h-dvh justify-center items-center'>
         <span className="loading loading-ring loading-lg text-white"></span>
      </div>;
   };
   if (user) {
      return children;
   };
   return <Navigate to={"/login"}></Navigate>;
};

export default PrivateRoute;