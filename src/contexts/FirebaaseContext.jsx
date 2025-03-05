import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      setUser(true);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    const blogsCollectionRef = collection(db, "blogs");

    // Set up real-time listener
    const unsubscribe = onSnapshot(blogsCollectionRef, (snapshot) => {
      const blogsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogsArray);
    });

    // Cleanup function to unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, setUser, blogs }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
