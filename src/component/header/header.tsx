import React from "react";
import cls from './header.module.scss';
import logo from '../../logo.svg';
import { connect, useDispatch } from "react-redux";
import { logoutTC } from "../../redux/auth-reducer";
import { appType } from "../../redux/store";

type propsType = {
    login: string | null
}

const Header: React.FC<propsType> = ({ login }) => {
    const dispatch = useDispatch()
    return(
        <header className={cls.header}>
            <img src={logo} alt="logo" />
            <div className={cls.login}>
                {login
                    ? <div>
                        <span>{login}</span>
                        <button onClick={() => dispatch(logoutTC())}>Logout</button>
                    </div>
                    : <span>You need be login</span>
                }
            </div>
        </header>
    )
}

let mapStateToProps = (state: appType) => {
    return{
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {})(Header);