import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavList = () => {
  const CustomizedNavLink = styled(NavLink)`
    font-family: sans-serif;
    font-size: 16.5px;
    text-decoration: none;
    padding: 4px;
    color: #fff;
    margin-left: 10px;

    :hover {
      transition: all 0.1s ease-in;
      border-bottom: 3px solid #fff;
    }
  `;
  return (
    <nav>
      <CustomizedNavLink to="/">Home</CustomizedNavLink>
      <CustomizedNavLink to="/edit-books">Management</CustomizedNavLink>
    </nav>
  );
};

export default NavList;
