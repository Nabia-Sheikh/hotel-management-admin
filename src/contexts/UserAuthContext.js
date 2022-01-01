import { createContext, useContext, useEffect, useState } from "react";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth, db } from "../firebase";

import { child, get, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

export const userAuthContext = createContext();


export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  function logIn(email, password) {
    get(child(ref(db), "/users")).then((data) => {
      const userAuth = Object.values(data.val()).filter(
        (item) => item.email === email && item.isAdmin === true
      );  
      if (userAuth[0]) {
        return signInWithEmailAndPassword(auth, email, password).then(()=>navigate("/rooms"))
      }
      alert("Please Sign in with Admin Account.");
    });
  }

  
  function logOut() {
    return signOut(auth);
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn,  logOut  }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
