import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  // <!-- Signup CARD -->

  const [initialValue, setInitialValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");

  const signUpHandler = async () => {
    try {
      //initially there would be no token as the user hasn't put any details yet

      setAuth({
        Authenticated: false,
        token: "",
      });
      setErrors(""); // no error as well

      const response = await axios.post(`/api/auth/signup`, {
        //we post the user details to the server and in response get the token which we store in the local storage. 

        name: initialValue.name,
        email: initialValue.email,
        password: initialValue.password,
        confirmPassword: initialValue.confirmPassword,
      });

      localStorage.setItem("TOKEN", response.data.encodedToken); // we then store the token on client in localstorage, where "TOKEN" is the key and the other is value we get from the backend

      //now when the token is created and the user logs in, this is what we setAuth to and navigate the user to homepage

      setAuth((user) => ({
        ...user,
        Authenticated: true,
        token: response.data.encodedToken,
      }));
      navigate("/");
    } catch (errors) {
      console.log(errors);
      setErrors(errors.response.data.createError);
    }
  };

  return (
    <div class="signup-container">
      <h2 class="login-header">Signup</h2>

      <div class="login-details">
        <div class="login-subdetails">
          <p class="subdetails-header">Name</p>
          <input
            class="login-input"
            placeholder="Kaustubh Manglurkar"
            value={initialValue.name}
            type="text"
            onChange={(e) =>
              setInitialValue({ ...initialValue, name: e.target.value })
            }
          />
        </div>

        <div class="login-subdetails">
          <p class="subdetails-header">Email address</p>
          <input
            class="login-input"
            placeholder="kaustubh@gmail.com"
            type="email"
            value={initialValue.email}
            onChange={(e) =>
              setInitialValue({ ...initialValue, email: e.target.value })
            }
          />
        </div>

        <div class="login-subdetails">
          <p class="subdetails-header">Password</p>
          <input
            class="login-input"
            placeholder="********"
            type="password"
            value={initialValue.password}
            onChange={(e) =>
              setInitialValue({ ...initialValue, password: e.target.value })
            }
          />
        </div>

        <div class="login-subdetails">
          <p class="subdetails-header">Confirm Password</p>
          <input
            value={initialValue.confirmaPassword}
            onChange={(e) =>
              setInitialValue({
                ...initialValue,
                confirmPassword: e.target.value,
              })
            }
            class="login-input"
            placeholder="********"
            type="password"
          />
        </div>

        <div class="signup-condition">
          <input required type="checkbox" />
          <p class="password-remember">I accept all Terms & Conditions</p>
        </div>

        <div class="signup-btn-container">
          <button onClick={signUpHandler} class="signup-btn">
            Create Account
          </button>
        </div>

        <div class="new-account-signup">
          <p>
            <Link class="text" to="/login-page">
              Already have an account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Signup };
