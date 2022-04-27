import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cls from './users.module.css';
import { getCurrentPageSelector, getFilterSelector, getPageSizeSelector, getTotalCountSelector, getUsersSelector } from "../../redux/selectors";
import { getUsersTC, followTC, unfollowTC, actions, filterType } from "../../redux/users-reducer";
import user_small from '../../user_small.jpg';
import { NavLink, useHistory } from "react-router-dom";
import Paginator from "./paginator";
import UsersFilter from "./usersFilter";
import * as queryString from 'querystring';
import { actions as actionsProfile } from "../../redux/profile-reducer";
import { ComponentWithAuthRedirectHoc } from "../../general/hocs";

const Users: React.FC = ({...props}) => {
    let currentPage = useSelector(getCurrentPageSelector)
    let pageSize = useSelector(getPageSizeSelector)
    let totalCount = useSelector(getTotalCountSelector)
    let users = useSelector(getUsersSelector)
    let filter = useSelector(getFilterSelector)
    let dispatch = useDispatch()
    let history = useHistory()
    let portionSize = 10
    const changePage = (page: number) => {
        dispatch(getUsersTC(page, pageSize, filter))
    }
    useEffect(() => {
        let parsedURL = queryString.parse(history.location.search.substr(1))
        console.log(parsedURL)
        let actualPage = currentPage
        let actualFilter = filter
        if (parsedURL.page) actualPage = Number(parsedURL.page)
        if (parsedURL.term) actualFilter = {...actualFilter, term: parsedURL.term as string}
        if(parsedURL.friend) actualFilter = {...actualFilter, friend: parsedURL.friend === 'true' 
                                                                    ? true : parsedURL.friend === 'false'
                                                                    ? false : null}
        switch(parsedURL.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null} as any
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }
        dispatch(getUsersTC(currentPage, pageSize, actualFilter as filterType))
    }, [])
    useEffect(() => {
        let query: any = {}
        if(filter.term) query.term = filter.term
        if(filter.friend) query.friend = filter.friend
        if(currentPage) query.page = currentPage

        history.push({
            pathname: '/Users',
            search: queryString.stringify(query) 
        })
    }, [filter, currentPage])

    return(
        <div className={cls.users}>
            <Paginator  changePage={changePage}
                        pageSize={pageSize}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        portionSize={portionSize}
            />
            <UsersFilter filter={filter}
                        currentPage={currentPage}
                        pageSize={pageSize}
            />
            {users.map((user, index) => <div key={user.name + index} className={cls.users__itemWrap}>
                <div className={cls.users__item}>
                    <div className={cls.user__photo}>
                        <NavLink to={`/Profile?id=${user.id}`}>
                            <img onClick={() => dispatch(actionsProfile.setIsFollowed(user.followed ? true : false))} 
                            src={user.photos.small ? user.photos.small : user_small}/>
                        </NavLink>
                    </div>
                    <div className={cls.user__data}>
                        <div className={cls.user__name}>
                            {user.name}
                        </div>
                        <div className={cls.user__folowing}>
                            {user.followed
                                ? <button onClick={() => dispatch(unfollowTC(user.id))}>Unfollow</button>
                                : <button onClick={() => dispatch(followTC(user.id))}>Follow</button>
                            }
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default ComponentWithAuthRedirectHoc(Users);