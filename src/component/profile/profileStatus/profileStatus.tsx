import React, { ChangeEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './profileStatus.module.scss'
import { getProfileStatusTC, updateProfileStatusTC } from "../../../redux/profile-reducer"
import { getStatusProfileSelector } from "../../../redux/selectors"

type propsType = {
    userId: number
    isOwner: boolean
}

const ProfileStatus: React.FC<propsType> = React.memo(({userId, isOwner}) => {
    let status = useSelector(getStatusProfileSelector)
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false)
    let [localStatus, setLocalStatus] = useState('')
    useEffect(() => {
        dispatch(getProfileStatusTC(userId))
    }, [])
    useEffect(() => {
        setLocalStatus(status)
    }, [status])
    const saveStatus = () => {
        dispatch(updateProfileStatusTC(localStatus))
        setEditMode(false)
    }
    let enableEditMode = () => {
        return isOwner ? setEditMode(true) : false
    }
    return <div className={styles.status}>
        {!editMode 
            ? <div className={styles.status__text}>
                <span onDoubleClick={enableEditMode}>{status}</span>
            </div>
            : <div className={styles.status__input}>
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => setLocalStatus(e.currentTarget.value)}
                autoFocus={true} onBlur={saveStatus} value={localStatus}/>
            </div>
        }
    </div>
})

export default ProfileStatus

