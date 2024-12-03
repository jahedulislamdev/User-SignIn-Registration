import React, { createContext, useState } from 'react';
import Navbar from './Components/Navigation/Navbar';
import { Outlet } from 'react-router-dom';

// Create Context
export const UserCheckerContext = createContext();

const App = () => {
  const [user, setUser] = useState(null); // State for user

  return (
    <div className="container mx-auto p-4 rounded-sm">
      <UserCheckerContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Outlet />
      </UserCheckerContext.Provider>
    </div>
  );
};

export default App;
