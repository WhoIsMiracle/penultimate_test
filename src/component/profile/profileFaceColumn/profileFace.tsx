import React, { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIsFollowedSelector } from "../../../redux/selectors"
import { profileType } from "../../../types/types"
import ProfileFriends from "./profileFriends/profileFriends"
import styles from './profileFace.module.scss'
import user_main from '../../../user_main.jpg';
import { followTC, unfollowTC } from "../../../redux/users-reducer";
import { updatePhotoProfileTC } from "../../../redux/profile-reducer"
import { ProfileFaceButton, WriteMessage } from "../../commons/buttons"

type propsType = {
    profile: profileType
    isOwner: boolean
}

const ProfileFace: React.FC<propsType> = ({profile, isOwner}) => {
    let [showButtonUpdate, setShowButtonUpdate] = useState(false)
    let isFollowed = useSelector(getIsFollowedSelector)
    let dispatch = useDispatch()
    let setShowButtonUpdateFunc = () => {
        showButtonUpdate === false ? setShowButtonUpdate(true) : setShowButtonUpdate(false)
    }
    let savePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            dispatch(updatePhotoProfileTC(e.target.files[0]))
        }
    }
    return <div className={styles.profile__face}>
        <div className={styles.profile__faceIMG}>
            <img src={profile.photos.large ? profile.photos.large : user_main} alt='profile photo'/>
        </div>
        {isOwner
            ? <ProfileFaceButton className={styles.profile__faceButton} callback={setShowButtonUpdateFunc}
                                innerHTML={'Update photo'}/>
            : isFollowed 
                    ? <ProfileFaceButton className={styles.profile__faceButton} innerHTML={'Unfollow'} 
                                        callback={() => dispatch(unfollowTC(profile.userId))}/>
                    : <ProfileFaceButton className={styles.profile__faceButton} innerHTML={'Follow'} 
                                        callback={() => dispatch(followTC(profile.userId))}/>}
        {isOwner 
            ? false
            : <WriteMessage className={styles.profile__faceButton} userId={profile.userId}/>
        }
        <input className={showButtonUpdate ? styles.photo__inputShow : styles.photo__inputHidden}
            onChange={savePhoto} type='file'/>
        <ProfileFriends/>
    </div>
}

export default ProfileFace