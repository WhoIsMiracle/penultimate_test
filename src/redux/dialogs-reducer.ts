import { Dispatch } from "redux"
import { dialogsAPI } from "../DAL/dialogsAPI"


let initialState = {
    messages: [] as any,
    loadReady: false as boolean
}

const dialogsReducer = (state=initialState, action: any) => {
    switch(action.type){
        case 'dialogs/GET_MESSAGES': 
            return {...state, messages: [...action.messages]}
        case 'dialogs/SET_LOAD_READY': 
            return {...state, loadReady: action.loadReady}
        default:
            return state
    }
}

export const actions = {
    getMessages: (messages: any) => ({type: 'dialogs/GET_MESSAGES', messages} as const),
    setLoadReady: (loadReady: any) => ({type: 'dialogs/SET_LOAD_READY', loadReady} as const),
}

export const getMessagesTC = (userId: number) => async (dispatch: Dispatch) => {
    let response = await dialogsAPI.getMessages(userId)
    dispatch(actions.getMessages(response.data.items))
}
export const sendMessagesTC = (userId: number, message: string) => (dispatch: Dispatch) => {
    dialogsAPI.postMessages(userId, message).then(response => {
        //@ts-ignore
        dispatch(getMessagesTC(userId))
    })
}

export default dialogsReducer