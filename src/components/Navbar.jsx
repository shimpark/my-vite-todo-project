// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { isLoggedIn, user } = useAuth();

  return (
    <nav style={{ marginBottom: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Home
      </Link>
      <Link to="/todos" style={{ marginRight: "1rem" }}>
        Todo List
      </Link>
      <Link to="/login" style={{ marginRight: "1rem" }}>
        {isLoggedIn ? "내 정보" : "로그인"}
      </Link>
      {isLoggedIn && <span> ( {user?.name} 님 )</span>}
    </nav>
  );
}

export default Navbar;
