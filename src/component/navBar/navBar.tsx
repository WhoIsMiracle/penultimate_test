import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAuthIdSelector } from "../../redux/selectors";
import cls from './navBar.module.css';


const NavBar: React.FC = () => {
  let authId = useSelector(getAuthIdSelector)
  return(
      <nav className={cls.navBar}>
        <ul className={cls.navBar__list}>
          <NavLink to={`/Profile?id=${authId}`}><li>Profile</li></NavLink>
          <NavLink to='/Users'><li>Users</li></NavLink>
          <NavLink to='/Chat'><li>Chat</li></NavLink>
        </ul>
      </nav>
  )
}

export default NavBar;