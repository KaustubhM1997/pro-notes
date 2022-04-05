import "./App.css";
import { Aside } from "./components/Aside/Aside";
import { Nav } from "./components/Nav/Nav";
import { ParentRouter } from "./Routes/routes";

function App() {
  return (
    <div className="App">
      <Nav/>
      <ParentRouter />
    </div>
  );
}

export default App;
