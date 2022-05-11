import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";
import {  getMessagesTC } from "../../redux/dialogs-reducer";
import {  getDialogsMessagesSelector, getProfileReadySelector, getProfileSelector } from "../../redux/selectors";
import styles from  './dialogs.module.scss'
import * as queryString from 'querystring';
import { getProfileTC } from "../../redux/profile-reducer";
import Loader from "../../general/loader/loader";
import DialogsHeader from "./dialogsHeader";
import DialogsMessagesZero from "./dialogsMessages/dialogsMessagesZero";
import DialogsMessagesBody from "./dialogsMessages/dialogsMessagesBody";
import DialogsInput from "./dialogsInput";


const Dialogs: React.FC = React.memo(() => {
    let messages = useSelector(getDialogsMessagesSelector)
    let profile: any = useSelector(getProfileSelector)
    let profileReady = useSelector(getProfileReadySelector)
    let history = useHistory()
    const dispatch = useDispatch()
    console.log(messages)
    useEffect(() => {
        let urlParsed: any = queryString.parse(history.location.search.substr(1))
        dispatch(getProfileTC(urlParsed.id))
    }, [])
    useEffect(() => {
        if(profileReady){
            dispatch(getMessagesTC(profile.userId))
            setTimeout(() => {
                dispatch(getMessagesTC(profile.userId))
            }, 500)
        }
    }, [profileReady])
    if(!profile){
        return <Loader/>
    }
    return(
        <div className={styles.dialogs}>
                <DialogsHeader/>
                {messages.length === 0
                    ? <DialogsMessagesZero/>
                    : <DialogsMessagesBody/> 
                }
                <DialogsInput/>
        </div>
    )
})

export default Dialogs