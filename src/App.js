import "./App.css";
import { Aside } from "./components/Aside/Aside";
import { Nav } from "./components/Nav/Nav";
import { ParentRouter } from "./Routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="child-wrapper">
        <Aside />
        <div className="content-wrapper">
          <ParentRouter />
          <Toaster
            position="top-right"
            containerStyle={{
              top: "5rem",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
