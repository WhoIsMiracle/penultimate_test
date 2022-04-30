import { instance, responseType } from "./API"

export const dialogsAPI = {
    // refreshMessages(userId: number){
    //     return instance.put(`/dialogs/${userId}`)
    // },
    getMessages(userId: number){
        return instance.get(`/dialogs/${userId}/messages`)
    },
    postMessages(userId: number, body: string){
        return instance.post(`/dialogs/${userId}/messages`, {body})
    }
}