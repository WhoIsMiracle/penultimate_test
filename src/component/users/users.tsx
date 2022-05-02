import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cls from './users.module.scss';
import { getCurrentPageSelector, getFilterSelector, getPageSizeSelector, getTotalCountSelector, getUsersSelector } from "../../redux/selectors";
import { getUsersTC, filterType } from "../../redux/users-reducer";
import { useHistory } from "react-router-dom";
import Paginator from "./paginator";
import UsersFilter from "./usersFilter";
import * as queryString from 'querystring';
import { actions as actionsProfile } from "../../redux/profile-reducer";
import { ComponentWithAuthRedirectHoc } from "../../general/hocs";
import { actions as appActions } from "../../redux/app-reducer";
import User from "./user";


const Users: React.FC = ({...props}) => {
    let currentPage = useSelector(getCurrentPageSelector)
    let pageSize = useSelector(getPageSizeSelector)
    let totalCount = useSelector(getTotalCountSelector)
    let users = useSelector(getUsersSelector)
    let filter = useSelector(getFilterSelector)
    let [viewType, setViewType] = useState<'classic' | 'flexible'>('flexible')
    let dispatch = useDispatch()
    let history = useHistory()
    let portionSize = 10
    const changePage = (page: number) => {
        dispatch(getUsersTC(page, pageSize, filter))
    }

    useEffect(() => {
        let parsedURL = queryString.parse(history.location.search.substr(1))
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
        <div className={viewType === 'classic' ? cls.users_classic : cls.users_flexible}>
            <Paginator  changePage={changePage}
                        pageSize={pageSize}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        portionSize={portionSize}
            />
            <div className={cls.users__filterWrap}>
                <UsersFilter/>
                {viewType === 'classic'
                    ? <button className={cls.button__view}
                        onClick={() => setViewType('flexible')}>ViewToFlexible</button>
                    : <button className={cls.button__view}
                        onClick={() => setViewType('classic')}>ViewToClassic</button>
                }
            </div>
            <div className={cls.users__body}>
                {users.map((user, index) => <User key={user.name + index} user={user} index={index}/>)}
            </div>

        </div>
    )
}

export default ComponentWithAuthRedirectHoc(Users)