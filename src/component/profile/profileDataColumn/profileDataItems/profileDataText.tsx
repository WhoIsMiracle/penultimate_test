import React, { useEffect } from "react";
import { profileType } from "../../../../types/types";
import cls from './profileData.module.css';

type propsType = {
    profile: profileType
    showContacts: boolean
    setEditMode: (editMode: boolean) => void
    setShowContacts: () => void
    isOwner: boolean
}

const ProfileDataText: React.FC<propsType> = ({profile, setEditMode, showContacts, isOwner, setShowContacts}) => {
    let profileContactKeys = Object.keys(profile.contacts)
    let finalContactsMap = []
    for(let i=0; i <= profileContactKeys.length; i++){
        finalContactsMap.push(
            <div className={cls.contact__container}>
                <div className={cls.contact__key}>{Object.keys(profile.contacts)[i]}</div>
                <div className={cls.contact__value}>{Object.values(profile.contacts)[i]}</div>
            </div>
        )
    }
    return(
        <div className={cls.data__text}>
            <div className={cls.data__description}>
                <ul>
                    <li><span><b>lookingJob:</b></span> {profile.lookingForAJob ? 'Active' : 'Not search'}</li>
                    <li><span><b>lookingJobDesc:</b></span> {profile.lookingForAJobDescription}</li>
                    <li><span><b>fullName:</b></span> {profile.fullName}</li>
                </ul>
            </div>
            <div className={cls.show__contacts} onClick={() => {setShowContacts()}}>
                {showContacts ? <span>Hide contacts</span> : <span>Show contacts</span>}
            </div>
            <div className={showContacts ? cls.data__contacts : cls.hidden__contacts}>
                {finalContactsMap.map(item => item)}
            </div>
            {isOwner ? <button onClick={() => setEditMode(true)}>EditText</button> : false}
            {/* Здесь важно писать setEditMode мод внутри коллбека */}
        </div>
    )
}

export default ProfileDataText;