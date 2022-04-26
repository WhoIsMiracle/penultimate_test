const observers = {
    'messages-received': [] as observerMessagesType[],
    'status-changed': [] as observerStatusType[],
}

let ws: WebSocket | null = null

const messageHandler = (e: any) => {
    observers['messages-received'].filter(obs => obs(JSON.parse(e.data)))
}
const statusHandler = (status: statusType) => {
    observers['status-changed'].filter(obs => obs(status))
}

const chatAPI = {
    createChannel(){
        statusHandler('pending')
        ws?.removeEventListener('message', messageHandler)
        ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
        ws?.addEventListener('message', messageHandler)
        statusHandler('ready')
    },
    subcribe(event: eventType, observer: observerMessagesType | observerStatusType){
        //@ts-ignore
        observers[event].push(observer)
        return () => {
            //@ts-ignore
            observers[event] = observers[event].filter(obs => obs !== observer)}
    },
    unsubscribe(event: eventType, observer: observerMessagesType | observerStatusType){
        //@ts-ignore
        observers[event] = observers[event].filter(obs => obs !== observer)
        observers[event] = []
        observers[event] = []
    },
    sendMessage(message: string){
        ws?.send(message)
    }
}

export default chatAPI


export type eventType = 'messages-received' | 'status-changed'
export type observerMessagesType = (messages: messagesType[]) => void
export type observerStatusType = (status: statusType) => void
export type statusType = 'ready' | 'pending' | 'error'

export type messagesType = {
    photo: string
    userName: string
    userId: number
    message: string
}
