const signOut = (setAuth, navigate) => {
    localStorage.removeItem("TOKEN");
    setAuth({
      Authenticated: false,
      token: "",
    });
    navigate("/");
  };
  
  export { signOut };