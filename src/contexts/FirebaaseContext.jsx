import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

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
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogsArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [db]);
  return (
    <FirebaseContext.Provider value={{ user, setUser, blogs }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext);
