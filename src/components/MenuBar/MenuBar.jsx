import { HeaderMenuStyled } from "./MenuBar.styled";
import { NavLink } from "react-router-dom";
import "./MenuBar.css"
import { Home, Settings } from "@mui/icons-material";

const MenuBar = () => {
    const navListItems = {
        title: 'Books',
        titleIcon: '',
        actions: [
            {
                text: 'Home',
                icon: Home,
                to: '/'
            },
            {
                text: 'Management',
                icon: Settings,
                to: '/edit-books',
            },
        ]
    }


    return (
        <HeaderMenuStyled>
            { 
                navListItems.actions && 
                navListItems.actions.map((navItem, index) => 
                    <NavLink key={index} className={({ isActive }) => (isActive ? "menu-items nav-active" : "menu-items")} to={navItem.to}>{navItem.text}</NavLink>
                )
            }
        </HeaderMenuStyled>
    );
    };

export default MenuBar;
