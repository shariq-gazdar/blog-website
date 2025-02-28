import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setUser(true);
    }
  }, [auth.currentUser]);
  return (
    <FirebaseContext.Provider value={{ user, setUser }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
