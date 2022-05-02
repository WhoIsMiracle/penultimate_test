import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './commons.module.scss'

type ProfileFaceButtonType = {
    className: any
    callback: () => void
    innerHTML: string
}
export const ProfileFaceButton: React.FC<ProfileFaceButtonType> = ({callback, className, innerHTML}) => {
    return (
        <button onClick={callback} className={className}>
            <span>{innerHTML}</span>
        </button>
    )
}

type writeMessageType = {
    userId: number
    className: any
}
export const WriteMessage: React.FC<writeMessageType> = ({userId, className}) => {
    return (
        <NavLink id={styles.buttons__navLink} to={`/Dialogs?id=${userId}`}>
            <button className={className}>
                <span>Write message</span>
            </button>
        </NavLink>
    )
}



