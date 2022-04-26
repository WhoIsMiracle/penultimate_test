import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getIsAuthSelectors } from "../redux/selectors";
import cls from './hocs.module.css';

export const ComponentWithAuthRedirectHoc = (Component: React.FC) => {
    const ComponentRedirectTest = () => {
        let isAuth = useSelector(getIsAuthSelectors)
        return <div className={cls.hocs__styles}>
            {isAuth ? <Component/> : <Redirect to='/Login'/>}
        </div>
    }
    return ComponentRedirectTest
}