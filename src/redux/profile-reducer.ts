import { appInferType } from './store';
import { profileAPI } from "../DAL/profileAPI";
import { photosType, profileType } from '../types/types';
import { Dispatch } from 'redux';


let initialState = {
    posts: [
        {post: 'post1'},
        {post: 'post2'},
        {post: 'post3'},
        {post: 'post4'},
        {post: 'post5'}
    ] as postType[],
    profile: null as profileType | null,
    status: '' as string,
    isFollowed: false as boolean,
    profileReady: false
}

const profileReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'profile/ADD_MESSAGE':
            return {...state, posts: [...state.posts, action.post]}
        case 'profile/SET_PROFILE':
            return {...state, profile: action.profile}
        case 'profile/SAVE_PHOTOS':
            return {...state, profile: {...state.profile, photos: action.photos} as profileType}
        case 'profile/SET_STATUS':
            return {...state, status: action.status}
        case 'profile/SET_IS_FOLLOWED':
            return {...state, isFollowed: action.isFollowed}
        case 'profile/SET_PROFILE_READY':
            return {...state, profileReady: action.ready}
        default:
            return state;
    }
}

export const actions = {
    addMessage: (post: postType) => ({type: 'profile/ADD_MESSAGE', post} as const),
    setProfile: (profile: profileType) => ({type: 'profile/SET_PROFILE', profile} as const),
    savePhoto: (photos: photosType) => ({type: 'profile/SAVE_PHOTOS', photos} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
    setIsFollowed: (isFollowed: boolean) => ({type: 'profile/SET_IS_FOLLOWED', isFollowed} as const),
    setProfileReady: (ready: boolean) => ({type: 'profile/SET_PROFILE_READY', ready} as const)
}

export const getProfileTC = (userid: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfileData(userid)
    dispatch(actions.setProfile(response.data))
    dispatch(actions.setProfileReady(true))
    //@ts-ignore
    dispatch(getProfileStatusTC(userid))
}

export const updateProfileDataTC = (profile: profileType, userid: number) => async (dispatch: any) => {
    let response = await profileAPI.updateProfileData(profile)
    if(response.data.resultCode === 0){
        dispatch(getProfileTC(userid))
    }else{
        console.error('some error with updateProfile')}}

export const updatePhotoProfileTC = (photo: File) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateProfilePhoto(photo)
    if(response.data.resultCode === 0){
        dispatch(actions.savePhoto(response.data.data.photos))
    }else console.error('some wrong with photo')
}

export const getProfileStatusTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfileStatus(userId)
    dispatch(actions.setStatus(response.data))
}
export const updateProfileStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateProfileStatus(status)
    if(response.data.resultCode === 0){
        dispatch(actions.setStatus(status))
    }else console.error('some error with status updating')
}


export default profileReducer;

type actionsType = appInferType<typeof actions>
type postType = {
    post: string
}