import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize state from localStorage or use default values
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smartcart_user');
    return savedUser ? JSON.parse(savedUser) : {
      name: 'Hemant Patil',
      email: 'hemant@example.com',
      address: '123 Main St',
    };
  });

  // Sync user state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('smartcart_user', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
