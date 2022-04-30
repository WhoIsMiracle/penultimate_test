import { appType } from "./store";


export const getIsAuthSelectors = (state: appType) => {
    return state.auth.isAuth
}
export const getProfileSelector = (state: appType) => {
    return state.profile.profile
}
export const getUsersSelector = (state: appType) => {
    return state.users.users
}
export const getTotalCountSelector = (state: appType) => {
    return state.users.totalCount
}
export const getCurrentPageSelector = (state: appType) => {
    return state.users.currentPage
}
export const getPageSizeSelector = (state: appType) => {
    return state.users.pageSize
}
export const getFilterSelector = (state: appType) => {
    return state.users.filter
}
export const getPostsProfileSelector = (state: appType) => {
    return state.profile.posts
}
export const getMessagesChatSelector = (state: appType) => {
    return state.chat.messages
}
export const getStatusChatSelector = (state: appType) => {
    return state.chat.status
}
export const getStatusProfileSelector = (state: appType) => {
    return state.profile.status
}
export const getIsFollowedSelector = (state: appType) => {
    return state.profile.isFollowed
}
export const getAppReadySelector = (state: appType) => {
    return state.app.appReady
}
export const getAuthIdSelector = (state: appType) => {
    return state.auth.id
}
export const getDialogsMessagesSelector = (state: appType) => {
    return state.dialogs.messages
}
export const getProfileReadySelector = (state: appType) => {
    return state.profile.profileReady
}
export const getAppHistorySelector = (state: appType) => {
    return state.app.history
}
export const getLoadReadySelector = (state: appType) => {
    return state.dialogs.loadReady
}