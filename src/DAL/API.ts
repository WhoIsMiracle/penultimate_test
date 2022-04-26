import axios from "axios";

export let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
    headers: {
        'API-KEY': '5e53e736-97c4-4d57-8052-77e354b267be'
    }
})

export type responseType<D> = {
    data: D
    resultCode: number
    messages: Array<string>
}




