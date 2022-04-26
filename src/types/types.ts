
export type photosType = {
        small: string | null
        large: string | null
}

export type userType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: photosType
}