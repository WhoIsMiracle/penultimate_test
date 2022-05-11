import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessagesTC,  } from "../../../../redux/dialogs-reducer";
import { getProfileSelector } from "../../../../redux/selectors";
import styles from  './../../dialogs.module.scss'


type propsType = {
    setSelectingMode: (mode: boolean) => void
    selectedMessages: Array<string>
    setSelectedMessages: (messages: Array<string>) => void
}

const MessagesSelectingMode: React.FC<propsType> = React.memo(({setSelectingMode, selectedMessages,
                                                                setSelectedMessages}) => {
    const dispatch = useDispatch()
    let profile: any = useSelector(getProfileSelector)

    return(
        <div className={styles.dialogs__selectingMode}>
            <button onClick={() => {
                dispatch(deleteMessagesTC(selectedMessages, profile.userId))
                setSelectingMode(false)
                setSelectedMessages(['clear'])
            }}>Delete</button>
            <button onClick={() => {
                setSelectingMode(false)
                setSelectedMessages(['clear'])
            }}>Cancel</button>
        </div>
    )
})

export default MessagesSelectingMode