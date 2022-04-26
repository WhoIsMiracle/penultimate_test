import React, { useState } from "react"
import { profileType } from "../../../types/types"
import styles from './profileData.module.css'
import ProfileStatus from "../profileStatus/profileStatus";
import ProfileDataForms from "./profileDataItems/profileDataForms";
import ProfileDataText from "./profileDataItems/profileDataText";
import ProfileDataPosts from "./profileDataItems/profileDataPosts/profileDataPosts";

type propsType = {
    profile: profileType
    isOwner: boolean
}

const ProfileData: React.FC<propsType> = ({profile, isOwner}) => {
    let [editMode, setEditMode] = useState(false)
    let [showContacts, setShowContactsState] = useState(false)

    let setShowContacts = () => {
        showContacts === false ? setShowContactsState(true) : setShowContactsState(false)
    }
    return <div className={styles.profile__dataWrap}>
        <div className={styles.profile__data}>
            <div className={styles.profile__name}>
                {profile.fullName
                    ? <span>{profile.fullName}</span>
                    : <span>NameSSS</span>
                }
            </div>
            <ProfileStatus isOwner={isOwner} userId={profile.userId}/>
            {editMode
                ? <ProfileDataForms showContacts={showContacts} profile={profile}
                    setShowContacts={setShowContacts} setEditMode={setEditMode}/>
                : <ProfileDataText isOwner={isOwner} setShowContacts={setShowContacts} profile={profile}
                    showContacts={showContacts} setEditMode={setEditMode}/>
            }
        </div>
        <ProfileDataPosts/>
    </div>
}

export default ProfileData