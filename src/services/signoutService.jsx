import {toast} from 'react-hot-toast';
const signOut = (setAuth, navigate) => {
    localStorage.removeItem("TOKEN");
    setAuth({
      Authenticated: false,
      token: "",
    });
    toast.error('You have logged out');
    navigate("/");
    
  };
  
  export { signOut };