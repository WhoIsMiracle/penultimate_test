import axios from "axios";


export let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '904d6c87-d7a6-413c-b2ac-7594fcc363d1'
    }
})

export type responseType<D> = {
    data: D
    resultCode: number
    messages: Array<string>
}




