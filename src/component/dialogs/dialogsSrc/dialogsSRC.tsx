import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteMessagesTC, getMessagesTC, getNewMessagesTC, sendMessagesTC } from "../../../redux/dialogs-reducer";
import { getAuthIdSelector, getDialogsMessagesSelector, getLoadReadySelector, getProfileReadySelector, getProfileSelector } from "../../../redux/selectors";
import styles from  './dialogs.module.scss'
import * as queryString from 'querystring';
import { getProfileTC } from "../../../redux/profile-reducer";
import Loader from "../../../general/loader/loader";
import user_small from '../../user_small.jpg'
import { actions } from '../../../redux/dialogs-reducer'

let telegrammButton = <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="send_24__Page-2" stroke="none" fill="none">
            <g id="send_24__send_24">
                <path id="send_24__Rectangle-76" d="M0 0h24v24H0z"/>
                <path d="M5.74 15.75a39.14 39.14 0 00-1.3 3.91c-.55 2.37-.95 2.9 1.11 1.78 2.07-1.13 12.05-6.69 14.28-7.92 2.9-1.61 2.94-1.49-.16-3.2C17.31 9.02 7.44 3.6 5.55 2.54c-1.89-1.07-1.66-.6-1.1 1.77.17.76.61 2.08 1.3 3.94a4 4 0 003 2.54l5.76 1.11a.1.1 0 010 .2L8.73 13.2a4 4 0 00-3 2.54z" id="send_24__Mask" fill="currentColor"/>
            </g>
        </g>
    </svg>

// @ts-ignore
let listenInterval
function startListeningMessages(myFunc: any){
        listenInterval = setInterval(myFunc, 5000)
}

const Dialogs: React.FC = React.memo(() => {
    let messages = useSelector(getDialogsMessagesSelector)
    let authId = useSelector(getAuthIdSelector)
    let loadReady = useSelector(getLoadReadySelector)
    let profile: any = useSelector(getProfileSelector)
    let profileReady = useSelector(getProfileReadySelector)
    let [currentValue, setCurrentValue] = useState('')
    let myTextareaRef: any = useRef('')
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    let [isAutoScroll, setIsAutoScroll] = useState(true)

    let history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        let urlParsed: any = queryString.parse(history.location.search.substr(1))
        dispatch(getProfileTC(urlParsed.id))
        // dispatch(getNewMessagesTC())
    }, [])

    useEffect(() => {
        if(profileReady){
            dispatch(getMessagesTC(profile.userId))
            setTimeout(() => {
                dispatch(getMessagesTC(profile.userId))
            }, 500)
        }else{
            console.log('profile is not ready')
        }
    }, [profileReady])

    useEffect(() => {
        function OnInput(){
            //@ts-ignore
            this.style.height = 'auto'
            //@ts-ignore
            this.style.height = (this.scrollHeight) + 'px'
        }
        if(loadReady === true){
            for (let i = 0; i < 1; i++) {
                myTextareaRef.current.setAttribute('style', 'height:')
                myTextareaRef.current.addEventListener("input", OnInput, false)
            }
        }
        return () => {
            myTextareaRef.current.removeEventListener("input", OnInput, false)
        }
    }, [loadReady])

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    const sendMessage = () => {
        dispatch(sendMessagesTC(profile.userId, currentValue))
        setCurrentValue('')
        myTextareaRef.current.style.height = '45px'
    }

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }
    let [listeningNow, setListeningNow] = useState(false)
    let [selectingMode, setSelectingMode] = useState(false)
    let [rightClick, setRightClick] = useState(false)
    let selectedMessagesId = [] as Array<string>//лучше всё таки запихнуть это дело в state
    let setSelectedMessageFunc = (messageId: string) => {
        if(selectedMessagesId.length >= 1){
            let isInArray = false
            selectedMessagesId.forEach(idArray => {
                if(idArray === messageId ){
                    isInArray = true
                }
            })
            // Или ещё более простой метод, но с меньшей поддержкой. Но результат тот же
            // isInArray = selectedMessagesId.includes(messageId)
            // isInArray ? console.log('this id in an Array already') : selectedMessagesId.push(messageId)

            // Ну и совсем нативный нативный метод.
            // for(let i=0; i < selectedMessagesId.length; i++){
            //     selectedMessagesId[i] === messageId ? isInArray = true : isInArray = false
            // }
            if(!isInArray){
                selectedMessagesId.push(messageId)
            }
        }else{
            selectedMessagesId.push(messageId)
        }
    }
    if(!profile){
        return <Loader/>
    }
    return(
        <div className={styles.dialogs}>
            <div className={styles.dialogs__header}>
                <div className={styles.dialogs__headerName}>
                    <NavLink id={styles.dialogs__name} to={`/Profile?id=${profile.userId}`}>
                        {profile ? profile.fullName : false}  
                    </NavLink>
                </div>
                <div>
                    <button disabled={listeningNow} onClick={() => {
                        startListeningMessages(() => dispatch(getMessagesTC(profile.userId)))
                        setListeningNow(true)
                        }}>
                        <span>StartReceivingMessages</span>
                    </button>
                    <button disabled={!listeningNow} onClick={() => {
                        {/* @ts-ignore */}
                        clearInterval(listenInterval)
                        setListeningNow(false)
                        }}>
                        <span>StopReceivingMessages</span>
                    </button>
                </div>
                <div className={styles.dialogs__headerAvatar}>
                    <NavLink to={`/Profile?id=${profile.userId}`}>
                        <img src={profile.photos.small ? profile.photos.small : user_small}/>
                    </NavLink>
                </div>
            </div>
                {messages.length === 0
                    ? <div className={styles.dialogs__messagesZero}>
                        {authId === profile.userId
                            ? <span>Sorry, but you can't send message yourself(</span>
                            : <span>Here is not messages, send your first)</span>
                        }
                    </div>
                    : <div>
                        {selectingMode
                            ? <div className={styles.dialogs__selectingMode}>
                                <button onClick={() => {
                                    dispatch(deleteMessagesTC(selectedMessagesId, profile.userId))
                                    setSelectingMode(false)
                                }}>Delete</button>
                                <button onClick={() => setSelectingMode(false)}>Cancel</button>
                            </div>
                            : false
                    }
                        <div className={styles.dialogs__messages} onScroll={scrollHandler}>
                            {/* @ts-ignore */}
                            {messages.map(message => {
                                if(authId == message.senderId){
                                    return <div key={message.id}
                                    onContextMenu={(e: any) => {
                                        e.preventDefault()
                                        setRightClick(true)}} className={styles.messages__myWrap}>
                                            {rightClick 
                                                ? <div className={styles.select__button}
                                                    onClick={() => {
                                                        setSelectingMode(true)
                                                    }}>
                                                    <span
                                                    onClick={selectingMode ? () => setSelectedMessageFunc(message.id)
                                                    : () => console.log(message.addedAt.substr(11, 5))
                                                } >select</span>
                                                </div>
                                            : false
                                        }

                                <div className={styles.messages__my}>
                                    {message.body}
                                    <span className={styles.messages__time}>
                                        {message.addedAt.substr(11, 5)}
                                    </span>
                                    {message.viewed 
                                        ? <span className={styles.viewed}>{'✔'}</span> 
                                        : <span className={styles.unviewed}>{'🔵'}</span>}
                                </div>
                            </div>
                        }else{
                            return <div key={message.id} className={styles.messages__friendWrap}>
                                    <div className={styles.messages__friend}>
                                        {message.body}
                                    </div>
                                </div>
                        }})}
                    </div>
                        <div ref={messagesAnchorRef}></div>
                    </div>
            }
            <div className={styles.messages__input}>
                <textarea onFocus={() => dispatch(actions.setLoadReady(true))} onKeyDown={(e: any) => {
                    if(e.code === 'Enter'){
                        e.preventDefault()
                        sendMessage()
                    }
                }} className={styles.input__area} onChange={(e: any) => {
                    setCurrentValue(e.currentTarget.value)}}
                value={currentValue} placeholder='Enter your message...' ref={myTextareaRef}/>
                <button disabled={authId === profile.userId ? true : false} onClick={sendMessage}>
                    {telegrammButton}
                </button>
            </div>
        </div>
    )
})

export default Dialogs