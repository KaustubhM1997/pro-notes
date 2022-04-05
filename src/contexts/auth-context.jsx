import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  //setting the initial Auth and fetching token from the backend

  const [auth, setAuth] = useState({
    Authenticated: localStorage.getItem("TOKEN") ? true : false, // to check whether the token is present or not

    token: localStorage.getItem("TOKEN") || "",
  }); // this condition will give the token to the user to access private routes if the token is present/the user has signed up, or else it would return nothingh/empty string

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
