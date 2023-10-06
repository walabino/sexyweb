import { createContext, useEffect, useState } from "react";
import { makeRequestAuth } from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    //AGREGARLE FUNCIONALIDAD AL API
    //try {
    const res = await makeRequestAuth.post("/auth/login", inputs);

    if (res.status == 200) {
      setCurrentUser(res.data.user);
    }
    return res;
    //} catch (error) {
    // console.log("error context", error);
    //}
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
