import Mockman from "mockman-js";
import {Routes, Route} from "react-router-dom";
import { Home } from "../pages/Home/home";
import { NoMatch } from "../pages/NoMatch/nomatch";
import { Login } from "../pages/Login/login";
import { Signup } from "../pages/Signup/signup";
import { Archive } from "../pages/Archive/archive";
import { Label } from "../pages/Label/label";
import { Trash } from "../pages/Trash/trash";
import "../App.css";
import "./routes.css";

const ParentRouter = () => {
  return (
    <div className="parent-routes">
      <Routes>
        <Route path="/trash" element={<Trash />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NoMatch />}></Route>
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/login-page" element={<Login />}></Route>
        <Route path="/signup-page" element={<Signup />}></Route>
        <Route path="/archive" element={<Archive />}></Route>
        <Route path="/labels" element={<Label />}></Route>
      </Routes>
    </div>
  );
};

export { ParentRouter };
