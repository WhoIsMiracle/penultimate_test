import { instance, responseType } from "./API"

type authDataType = {
        id: number
        email: string
        login: string
}

export const authAPI = {
    getAuthData(){
        return instance.get<responseType<authDataType>>('/auth/me')},
    login(email: string, password: string, rememberMe: boolean, captcha: any=null){
        return instance.post<responseType<any>>('/auth/login', {email, password, rememberMe, captcha})},
    logout(){
        return instance.delete<responseType<any>>('/auth/login')
    }
}