import React from "react";
import { NavLink } from "react-router-dom";
import cls from './navBar.module.css';


const NavBar: React.FC = () => {
    return(
        <nav className={cls.navBar}>
          <ul className={cls.navBar__list}>
            <NavLink to={`/Profile?id=${19901}`}><li>Profile</li></NavLink>
            <NavLink to='/Users'><li>Users</li></NavLink>
            <NavLink to='/Chat'><li>Chat</li></NavLink>
          </ul>
        </nav>
    )
}

export default NavBar;