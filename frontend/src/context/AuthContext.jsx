import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// context that holds the current user and logout function
const AuthContext = createContext();

// hook so any component can grab auth state without prop drilling
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // listen for firebase auth changes and keep currentUser in sync
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // unsubscribe when the provider unmounts
    return unsubscribe;
  }, []);

  const logout = () => signOut(auth);

  // don't render children until firebase has resolved the initial auth state
  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
