import React, { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIsFollowedSelector } from "../../../redux/selectors"
import { profileType } from "../../../types/types"
import ProfileFriends from "./profileFriends/profileFriends"
import styles from './profileFace.module.css'
import user_main from '../../../user_main.jpg';
import { followTC, unfollowTC } from "../../../redux/users-reducer";
import { updatePhotoProfileTC } from "../../../redux/profile-reducer"
import { NavLink } from "react-router-dom"

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
        {isOwner ? <div onClick={setShowButtonUpdateFunc} className={styles.photo__update}>
            <div className={styles.photo__updateText}>Update photo</div>
        </div>
        : <div className={styles.profile__following}>
            {isFollowed ? <div className={styles.profile__follow} onClick={() => {
                dispatch(unfollowTC(profile.userId))
            }}>Unfollow</div> 
            : <div className={styles.profile__follow} onClick={() => dispatch(followTC(profile.userId))}>
                Follow
            </div>}
        </div>}
        {isOwner 
            ? false
            : <div id={styles.profile__navLink}>
                <NavLink to={`/Dialogs?id=${profile.userId}`}>
                    <div className={styles.profile__writeMessage}><span>Write message</span></div>
                </NavLink>
            </div>
        }
        <input className={showButtonUpdate ? styles.photo__inputShow : styles.photo__inputHidden}
            onChange={savePhoto} type='file'/>
        <ProfileFriends/>
    </div>
}

export default ProfileFace