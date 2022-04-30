import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUsersSelector } from "../../../../redux/selectors"
import { getUsersTC } from "../../../../redux/users-reducer"
import cls from './profileFriend.module.css'
import user_small from '../../../../user_small.jpg'
import { userType } from "../../../../types/types"
import { v1 } from "uuid"
import { NavLink, useHistory } from "react-router-dom"
import { actions } from "../../../../redux/app-reducer"


const ProfileFriends: React.FC = () => {
    let friends: Array<userType> = useSelector(getUsersSelector)
    let dispatch = useDispatch()
    let history = useHistory()
    useEffect(() => {
        dispatch(getUsersTC(1, 9, {term: '', friend: true}))
    }, [])
    let friendsMapped = friends.filter((user, index) => user).map((friend, index) => {
        return <div key={index + v1()} className={cls.friends__item}>
            <NavLink to={`/Profile?id=${friend.id}`} replace>
                <img onClick={() => dispatch(actions.setHistory(history.location.search))} src={friend.photos.small ? friend.photos.small : user_small}/>
            </NavLink>
            <div>{friend.name.slice(0, 7)}</div>
        </div>
    })
    return(
        <div className={cls.profile__friends}>
            <div className={cls.friends__header}>
                <span>Friends {friends.length === 9 ? friends.length : null}</span>
            </div>
            <div className={cls.friends__body}>
                {friendsMapped.length === 9 ? friendsMapped : null}
            </div>
        </div>
    )
}

export default ProfileFriends