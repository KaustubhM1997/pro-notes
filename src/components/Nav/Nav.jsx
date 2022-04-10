import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { signOut } from "../../services/signoutService";

const Nav = () => {
  const {
    auth: { Authenticated },
    setAuth,
  } = useAuth();

  const navigate = useNavigate;
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
      {!Authenticated && (
        <div className="nav-cta">
          <a className="primary-btn" href="/login-page">
            Login
          </a>
        </div>
      )}

      {Authenticated && (
        <div className="nav-cta" onClick={() => signOut(setAuth, navigate)}>
          <span className="primary-btn">Logout</span>
        </div>
      )}
    </nav>
  );
};

export { Nav };
