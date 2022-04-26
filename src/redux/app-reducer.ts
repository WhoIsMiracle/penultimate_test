import { Dispatch } from 'redux'
import { getAuthDataTC } from './auth-reducer'
import { appInferType } from './store'

let initialState = {
    appReady: false
}

const appReducer = (state=initialState, action: actionsType) => {
    switch(action.type){
        case 'app/APP_READY':
            return {...state, appReady: action.ready}

    default: return state
    }
}

const actions = {
    setAppReady: (ready: boolean) => ({type: 'app/APP_READY', ready} as const)
}

export const appInitialize = () => (dispatch: Dispatch) => {
    //@ts-ignore
    let promise = dispatch(getAuthDataTC())
    Promise.all([promise])
        .then(() => {
            dispatch(actions.setAppReady(true));
        });
}

export default appReducer

type actionsType = appInferType<typeof actions>