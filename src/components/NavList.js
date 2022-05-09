import { NavLink } from "react-router-dom";
import "./NavList.css";

const NavList = () => {
  return (
    <nav>
      <NavLink
        className={({ isActive }) => (isActive ? "nav-active" : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "nav-active" : "")}
        to="/edit-books"
      >
        Management
      </NavLink>
    </nav>
  );
};

export default NavList;
