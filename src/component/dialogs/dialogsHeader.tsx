import React, { useState } from "react"
import styles from './dialogs.module.scss'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getProfileSelector } from "../../redux/selectors"
import user_small from '../../user_small.jpg'
import { getMessagesTC } from "../../redux/dialogs-reducer"
import { profileType } from "../../types/types"

let listenInterval: any
function startListeningMessages(myFunc: any){
        listenInterval = setInterval(myFunc, 5000)
}
const DialogsHeader = () => {
    const profile = useSelector(getProfileSelector) as profileType
    const [listeningNow, setListeningNow] = useState(false)

    const dispatch = useDispatch()

    return(
        <div className={styles.dialogs__header}>
            <div className={styles.dialogs__headerName}>
                <NavLink id={styles.dialogs__name} to={`/Profile?id=${profile.userId}`}>
                    {profile ? profile.fullName : false}  
                </NavLink>
            </div>
            <div>
                <button disabled={listeningNow} onClick={() => {
                    startListeningMessages(() => dispatch(getMessagesTC(profile.userId)))
                    setListeningNow(true)
                    }}>
                    <span>StartReceivingMessages</span>
                </button>
                <button disabled={!listeningNow} onClick={() => {
                    {/* @ts-ignore */}
                    clearInterval(listenInterval)
                    setListeningNow(false)
                    }}>
                    <span>StopReceivingMessages</span>
                </button>
            </div>
            <div className={styles.dialogs__headerAvatar}>
                <NavLink to={`/Profile?id=${profile.userId}`}>
                    <img src={profile.photos.small ? profile.photos.small : user_small}/>
                </NavLink>
            </div>
        </div>
    )
}

export default DialogsHeader