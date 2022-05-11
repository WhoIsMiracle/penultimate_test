import { Dispatch } from "redux"
import { dialogsAPI } from "../DAL/dialogsAPI"


let initialState = {
    messages: [] as any,
    loadReady: false as boolean,
    newMessages: []
}

const dialogsReducer = (state=initialState, action: any) => {
    switch(action.type){
        case 'dialogs/SET_MESSAGES': 
            return {...state, messages: [...action.messages]}
        case 'dialogs/SET_LOAD_READY': 
            return {...state, loadReady: action.loadReady}
        case 'dialogs/SET_NEW_MESSAGES': 
            return {...state, newMessages: action.newMessages}
        default:
            return state
    }
}

export const actions = {
    getMessages: (messages: any) => ({type: 'dialogs/SET_MESSAGES', messages} as const),
    setLoadReady: (loadReady: any) => ({type: 'dialogs/SET_LOAD_READY', loadReady} as const),
    setNewMessages: (newMessages: any) => ({type: 'dialogs/SET_NEW_MESSAGES', newMessages} as const)
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
export const getNewMessagesTC = () => async (dispatch: Dispatch) => {
    let response = await dialogsAPI.getNewMessages()
    dispatch(actions.setNewMessages(response.data.items))
}
export const deleteMessagesTC = (messagesId: Array<string>, userId: number) => (dispatch: Dispatch) => {
    for(let i=0; i <= messagesId.length; i++){
        if(messagesId[i] === messagesId[i + 1]){
            messagesId.splice(i, 1)
            }
        }
    let promises: any = []
    messagesId.forEach(id => {
        dialogsAPI.deleteMessage(id).then(res => {
            if(res.data.resultCode === 0){
                promises.push(new Promise((resolve, reject) => {
                    resolve('some')
                    console.log(promises)
                }))
            }else{
                console.log('resultCode from deleting message is not 0')
            }
            if(promises.length >= messagesId.length){
                Promise.all([...promises]).then((data) => {
                //@ts-ignore
                dispatch(getMessagesTC(userId))
                })
            }
        })
    })
    console.log('i will be first')
}

export default dialogsReducer