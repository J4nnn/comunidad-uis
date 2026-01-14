import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize user from sessionStorage
    const usertype = sessionStorage.getItem('usertype');
    const id_user = sessionStorage.getItem('id_user');
    const name = sessionStorage.getItem('name');

    if (usertype && id_user && name) {
      setUser({
        usertype,
        id: id_user,
        name,
      });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    sessionStorage.setItem('usertype', userData.usertype);
    sessionStorage.setItem('id_user', userData.id);
    sessionStorage.setItem('name', userData.name);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
