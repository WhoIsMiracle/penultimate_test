import { applyMiddleware, combineReducers, createStore } from "redux";
import authReducer from "./auth-reducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import chatReducer from "./chat-reducer";
import appReducer from "./app-reducer";


let reducers = combineReducers({
    form: formReducer,
    auth: authReducer,
    profile: profileReducer,
    users: usersReducer,
    chat: chatReducer,
    app: appReducer
})


const store = createStore(reducers, applyMiddleware(thunk))

export type appType = ReturnType<typeof reducers>
export type appInferType<AT> = AT extends {[key: string]: (...args: any[]) => infer R} ? R : never


export default store;