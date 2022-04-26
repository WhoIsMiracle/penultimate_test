import { instance, responseType } from "./API"
import { userType } from "../types/types"

export type responseGetUsersType<D> = {
    items: D
    resultCode: number
    messages: Array<string>
    totalCount: number
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, filter: {term: string, friend: string | boolean}){
        return instance.get<responseGetUsersType<userType[]>>(`/users?count=${pageSize}&page=
                                                    ${currentPage}&term=${filter.term}&friend=${filter.friend}`)},
    follow(userId: number){
        return instance.post<responseType<any>>(`/follow/${userId}`, userId)},
    unfollow(userId: number){
        return instance.delete<responseType<any>>(`/follow/${userId}`)},       
}