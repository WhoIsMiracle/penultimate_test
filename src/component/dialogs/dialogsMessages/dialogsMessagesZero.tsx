import React from "react";
import { useSelector } from "react-redux";
import { getAuthIdSelector, getProfileSelector } from "../../../redux/selectors";
import styles from  './../dialogs.module.scss'


const DialogsMessagesZero = () => {
    let profile: any = useSelector(getProfileSelector)
    let authId = useSelector(getAuthIdSelector)
    return(
        <div className={styles.dialogs__messagesZero}>
            {authId === profile.userId
                ? <span>Sorry, but you can't send message yourself(</span>
                : <span>Here is not messages, send your first)</span>
            }
        </div>
    )
}

export default DialogsMessagesZero