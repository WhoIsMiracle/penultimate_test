import { profileType } from "../types/types"
import { instance, responseType } from "./API"


export const profileAPI = {
    getProfileData(userid: number){
        return instance.get<profileType>(`/profile/${userid}`)},
    updateProfileData(profile: profileType){
        return instance.put<responseType<any>>('/profile', profile)},
    updateProfilePhoto(photo: File){
        let formData = new FormData()
        formData.append('image', photo)
        return instance.put<responseType<any>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'}})},
    getProfileStatus(userId: number){
        return instance.get<string>(`/profile/status/${userId}`)},
    updateProfileStatus(status: string){
        return instance.put<responseType<any>>('/profile/status', {status: status})
    }
}