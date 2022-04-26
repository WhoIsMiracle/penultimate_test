import { Dispatch } from 'redux'
import chatAPI, { observerMessagesType, observerStatusType, statusType } from '../DAL/chatAPI'
import { messagesType } from '../DAL/chatAPI'
import {v1, v4} from 'uuid'

let initialState = {
    messages: [] as messagesType[],
    status: 'pending'
}

const chatReducer = (state=initialState, action: any): typeof initialState => {
    switch(action.type){
        case 'chat/MESSAGES_RECEIVED':
            return {
                ...state, 
                messages://@ts-ignore
                        [...state.messages, ...action.messages.map(m => ({...m, id: v4()}))]
                        .filter((m, index, arr) => index >= arr.length - 100)
            }
        case 'chat/STATUS_CHANGED':
            return {...state, status: action.status}
        case 'chat/CLEAN_MESSAGES':
            return {...state, messages: []}
    default:
        return state
    }
}

export const actions = {
    messagesReceived: (messages: messagesType[]) => ({type: 'chat/MESSAGES_RECEIVED', messages} as const),
    statusChanged: (status: statusType) => ({type: 'chat/STATUS_CHANGED', status} as const),
    cleanMessages: () => ({type: 'chat/CLEAN_MESSAGES'} as const),
}

let _observerMessages: null | observerMessagesType = null
let observerMessagesCreator = (dispatch: Dispatch) => {
    if(_observerMessages === null){
        _observerMessages = (messages: messagesType[]) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _observerMessages
}

let _observerStatus: null | observerStatusType = null
let observerStatusCreator = (dispatch: Dispatch) => {
    if(_observerStatus === null){
        _observerStatus = (status: statusType) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _observerStatus
}

export const startListeningMessagesTC = (dispatch: Dispatch) => {
    chatAPI.createChannel()
    chatAPI.subcribe('messages-received', observerMessagesCreator(dispatch))
    chatAPI.subcribe('status-changed', observerStatusCreator(dispatch))
}
export const stopListeningMessagesTC = (dispatch: Dispatch) => {
    dispatch(actions.cleanMessages())
    chatAPI.unsubscribe('messages-received', observerMessagesCreator(dispatch))
    chatAPI.unsubscribe('status-changed', observerStatusCreator(dispatch))
}
export const sendMessage = (message: string) => {
    chatAPI.sendMessage(message)
}

export default chatReducer