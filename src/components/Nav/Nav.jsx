import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <nav className="nav-container">
      <Link className="link-style" to="/">
        <div className="brand-name">
          Pro<span style={{ color: "black" }}>NOTES</span>{" "}
        </div>
      </Link>

      <div className="nav-input">
        <input placeholder="Search items" type="search" />
      </div>
      <div className="nav-cta">
        <a className="primary-btn" href="">
          Login
        </a>
      </div>
    </nav>
  );
};

export { Nav };
