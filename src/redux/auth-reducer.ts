import { appInferType } from './store';
import { authAPI } from "../DAL/authAPI";


let initialState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false as boolean
}

const authReducer = (state=initialState, action: actionsType): typeof initialState => {
    switch(action.type){
        case 'auth/GET_AUTH_USER_DATA':
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const actions = {
    me: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => {
        return {type: 'auth/GET_AUTH_USER_DATA', payload: {id, email, login, isAuth}} as const
    }
}

export const getAuthDataTC = () => async (dispatch: any) => {
        const response = await authAPI.getAuthData()
        if(response.data.resultCode === 0){
            let {id, email, login} = response.data.data;
            dispatch(actions.me(id, email, login, true))

        }else{
            return 'you are not authorized or it is some error'}}

export const loginTC = (email: string, 
                        password: string,
                        rememberMe: boolean, 
                        captcha: null | string=null) => async (dispatch: any) => {
        const response = await authAPI.login(email, password, rememberMe)
        if(response.data.resultCode === 0){
            dispatch(getAuthDataTC())
            return new Promise((resolve, reject) => {
                resolve('/Profile')
            })
        } console.error('some error')}

export const logoutTC = () => async (dispatch: any) => {
        const response = await authAPI.logout()
        if(response.data.resultCode === 0){
            dispatch(actions.me(null, null, null, false))
        } console.error('some error')}

export default authReducer;

type actionsType = appInferType<typeof actions>