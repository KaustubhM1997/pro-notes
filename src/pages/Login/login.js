import { React } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import { Link } from "react-router-dom";
import "./login.css";
import {toast} from 'react-hot-toast';

const Login = () => {
  //setting the initial values for email and password

  const [input, setInput] = useState({
    email: "adarshbalika@gmail.com",
    password: "adarshBalika123",
  });

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  async function loginHandler() {
    try {
      //setting the auth value

      setAuth({
        //the auth would be false initially when the user hasn't logged in yet and no token would be generated

        Authenticated: false,
        token: "",
      });

      setErrors(""); // no errors initially

      //sending data to backend using post that we get from user and receiving a response

      const response = await axios.post("/api/auth/login", {
        email: input.email, ///we send these values to the backend that we get from the user to check whether this user exists. The test credentials are adarsh balika, this user exists on the backend.
        password: input.password,
      });


      toast.success('Login successful!');

      //putting the encoded token we get from the backend into localstorage

      localStorage.setItem("TOKEN", response.data.encodedToken);

      //when the user has logged in

      setAuth((user) => ({
        ...user,
        Authenticated: true,
        token: response.data.encodedToken,
      }));
      navigate("/"); //after the user has logged in, we navigate him to the home page
    } catch (errors) {
      console.log(errors);
      // setErrors(errors.response.data.createError); // we get the position this from above for status code 500
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>

      <div className="login-details">
        <div className="login-subdetails">
          <p className="subdetails-header">Email address</p>
          <input
            required
            className="login-input"
            placeholder="kaustubh@gmail.com"
            type="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>

        <div className="login-subdetails">
          <p className="subdetails-header">Password</p>
          <input
            required
            className="login-input"
            placeholder="********"
            type="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>

        <div className="forgot-password">
          <input type="checkbox" /> <p class="password-remember">Remember me</p>
          <p className="forgot-password-text">Forgot your Password?</p>
        </div>

        <div class="btn-container">
          <button onClick={loginHandler} className="login-btn">
            Login
          </button>
        </div>

        <div class="new-account">
          <p>
            <Link className="text" to="/signup-page">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Login };
