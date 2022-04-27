import React from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { getAppReadySelector, getIsAuthSelectors } from "../redux/selectors";
import cls from './hocs.module.css';
import Loader from "./loader/loader";

export const ComponentWithAuthRedirectHoc = (Component: React.FC) => {
    const ComponentRedirectTest = () => {
        let isAuth = useSelector(getIsAuthSelectors)
        let appReady = useSelector(getAppReadySelector)
        if(!appReady) return <Loader/>
        return <div className={cls.hocs__styles}>
            {isAuth ? <Component/> : <Redirect to='/Login'/>}
        </div>
    }
    return ComponentRedirectTest
}