import { instance, responseType } from "./API"

export const dialogsAPI = {
    // refreshMessages(userId: number){
    //     return instance.put(`/dialogs/${userId}`)
    // },
    getMessages(userId: number){
        return instance.get(`/dialogs/${userId}/messages?count=${20}&page=${1}`)
    },
    postMessages(userId: number, body: string){
        return instance.post(`/dialogs/${userId}/messages`, {body})
    },
    getNewMessages(){
        return instance.get('dialogs/messages/new/count')
    },
    deleteMessage(messageId: string){
        return instance.delete(`dialogs/messages/${messageId}`)
    }
}