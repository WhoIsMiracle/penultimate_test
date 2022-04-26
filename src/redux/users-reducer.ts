import { usersAPI } from '../DAL/usersAPI';
import { appInferType } from './store';
import { userType } from "../types/types"
import { actions as actionsProfile } from './profile-reducer';

export type filterType = {
    term: string,
    friend: string | boolean | any
}

let initialState = {
    users: [] as Array<userType>,
    totalCount: 1000,
    pageSize: 25,
    currentPage: 1,
    filter: {
        term: '',
        friend: null
    } as filterType
}

const usersReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'users/SET_USERS':
            return {...state, users: [...action.users]}
        case 'users/SET_TOTAL_COUNT':
            return {...state, totalCount: action.totalCount}
        case 'users/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'users/FOLLOW':
            return {...state, users: state.users.map(user => {
                if(user.id === action.userId){
                    return {...user, followed: true}
                } return user
            })}
        case 'users/UNFOLLOW':
            return {...state, users: state.users.map(user => {
                if(user.id === action.userId){
                    return {...user, followed: false}
                } return user
            })}
        case 'users/SET_FILTER':
            return {...state, filter: {...action.filter}}
    default:
        return state
    }
}

export const actions = {
    setUsers: (users: userType[]) => ({type: 'users/SET_USERS', users} as const),
    setTotalCount: (totalCount: number) => ({type: 'users/SET_TOTAL_COUNT', totalCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
    follow: (userId: number) => ({type: 'users/FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setFilter: (filter: filterType) => ({type: 'users/SET_FILTER', filter} as const)
}
type actionsType = appInferType<typeof actions>

export const getUsersTC = (currentPage: number, pageSize: number, filter: filterType) => async (dispatch: any) => {
    let response = await usersAPI.getUsers(currentPage, pageSize, filter)
        dispatch(actions.setFilter(filter))
        dispatch(actions.setUsers(response.data.items))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setTotalCount(response.data.totalCount))}

export const followTC = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.follow(userId)
    if(response.data.resultCode === 0){
        dispatch(actions.follow(userId))
        dispatch(actionsProfile.setIsFollowed(true))
    }else{
        console.error('some error with your following')
    }
}

export const unfollowTC = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.unfollow(userId)
    if(response.data.resultCode === 0){
        dispatch(actions.unfollow(userId))
        dispatch(actionsProfile.setIsFollowed(false))
    }else{
        console.error('some error with your following')
    }
}


export default usersReducer;