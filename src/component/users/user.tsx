import React from "react";
import { useDispatch} from "react-redux";
import cls from './users.module.scss';
import { followTC, unfollowTC } from "../../redux/users-reducer";
import user_small from '../../user_small.jpg';
import { NavLink, useHistory } from "react-router-dom";
import { actions as actionsProfile } from "../../redux/profile-reducer";
import { actions as appActions } from "../../redux/app-reducer";


const User: React.FC<any> = ({user, index}) => {
    let history = useHistory()
    let dispatch = useDispatch()
    //@ts-ignore
    return (
        <div className={cls.users__item}>
            <div className={cls.user}>
                <div onClick={() => dispatch(appActions.setHistory(history.location.search))}
                    className={cls.user__photo}>
                    <NavLink to={`/Profile?id=${user.id}`}>
                        <img onClick={() => dispatch(actionsProfile.setIsFollowed(user.followed ? true : false))} 
                        src={user.photos.small ? user.photos.small : user_small}/>
                    </NavLink>
                </div>
                <div className={cls.user__data}>
                    <div className={cls.user__name}>
                        {user.name}
                    </div>
                    <div className={cls.user__following}>
                        {user.followed
                            ? <button onClick={() => dispatch(unfollowTC(user.id))}>Unfollow</button>
                            : <button onClick={() => dispatch(followTC(user.id))}>Follow</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default User