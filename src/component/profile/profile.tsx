import React, { useEffect, useState } from "react";
import styles from './profile.module.css'; 
import { ComponentWithAuthRedirectHoc } from "../../general/hocs";
import { getProfileTC} from '../../redux/profile-reducer';
import { useDispatch, useSelector } from "react-redux";
import { getAuthIdSelector, getProfileSelector } from "../../redux/selectors";
import Loader from "../../general/loader/loader";
import { useHistory } from "react-router-dom";
import * as queryString from 'querystring';
import ProfileFace from "./profileFaceColumn/profileFace";
import ProfileData from "./profileDataColumn/profileData";


const Profile: React.FC = () => {
    let [isOwner, setIsOwner] = useState(false)
    let dispatch = useDispatch()
    let profile = useSelector(getProfileSelector)
    let history = useHistory()
    let authId = useSelector(getAuthIdSelector)
    useEffect(() => {
        let urlParsed: any = queryString.parse(history.location.search.substr(1))
        if(!urlParsed.id){
            urlParsed.id = authId
        }
        Number(urlParsed.id) === authId ? setIsOwner(true) : setIsOwner(false)
        console.log(urlParsed.id)
        console.log(authId)
        dispatch(getProfileTC(urlParsed.id))
    }, [history.location.search])

    if(!profile){
        return <Loader/>
    }
    return (
        <div className={styles.profile}>
            <ProfileFace profile={profile} isOwner={isOwner}/>
            <ProfileData profile={profile} isOwner={isOwner}/>
        </div>
    )
}

const ProfileContainer = ComponentWithAuthRedirectHoc(Profile)

export default ProfileContainer;