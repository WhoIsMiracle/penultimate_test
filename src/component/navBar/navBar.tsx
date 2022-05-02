import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getAppHistorySelector, getAuthIdSelector } from "../../redux/selectors";
import cls from './navBar.module.scss';
import * as queryString from 'querystring';

const NavBar: React.FC = () => {
  let authId = useSelector(getAuthIdSelector)
  let [activeNavElem, setActiveNavElem] = useState('/Profile')
  let [changedLocation, setChangedLocation] = useState('was change')
  let history = useHistory()
  let appHistory = useSelector(getAppHistorySelector)

  useEffect(() => {
    let parsedUrl: any = queryString.parse(history.location.pathname)
    setActiveNavElem(Object.keys(parsedUrl)[0])
  }, [changedLocation])
  
  useEffect(() => {
    let url = queryString.parse(history.location.pathname)
    setChangedLocation('was changed')
    setActiveNavElem(Object.keys(url)[0])
  }, [appHistory])

  return(
      <nav className={cls.navBar}>
        <ul className={cls.navBar__list}>
          <NavLink to={`/Profile?id=${authId}`} replace>
            <li className={activeNavElem === '/Profile' ? cls.navBar__listActive : cls.navBar__listInactive}
              onClick={() => setChangedLocation('was changeProfile')}>
              Profile
            </li>
          </NavLink>
          <NavLink to='/Users' replace>
            <li className={activeNavElem === '/Users' ? cls.navBar__listActive : cls.navBar__listInactive}
              onClick={() => setChangedLocation('was changeUsers')}>
              Users
            </li>
          </NavLink>
          <NavLink to='/Chat' replace>
            <li className={activeNavElem === '/Chat' ? cls.navBar__listActive : cls.navBar__listInactive}
              onClick={() => setChangedLocation('was changeChat')}>
              Chat
              </li>
          </NavLink>
          <NavLink to={`/Dialogs?id=${authId}`} replace>
            <li className={activeNavElem === '/Dialogs' ? cls.navBar__listActive : cls.navBar__listInactive}
              onClick={() => setChangedLocation('was changeDialogs')}>
                Dialogs
              </li>
          </NavLink>
        </ul>
      </nav>
  )
}

export default NavBar;