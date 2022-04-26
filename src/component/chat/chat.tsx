import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startListeningMessagesTC, sendMessage, stopListeningMessagesTC } from '../../redux/chat-reducer'
import { getMessagesChatSelector } from '../../redux/selectors'
import styles from './chat.module.css'
import { messagesType } from '../../DAL/chatAPI'
import user_small from '../../user_small.jpg'
import { ComponentWithAuthRedirectHoc } from '../../general/hocs'
import { NavLink } from 'react-router-dom'

const Chat = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        startListeningMessagesTC(dispatch)
        return () => {
            stopListeningMessagesTC(dispatch)
        }
    }, [])
    return <div className={styles.chat}>
        <Messages/>
        <ChatInputArea/>
    </div>
}

const Messages = () => {
    let [messages, setMessages] = useState([])
    let message: messagesType[] = useSelector(getMessagesChatSelector)
    useEffect(() => {
        //@ts-ignore
        setMessages(message)
    }, [message])
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
        {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])

    return <div className={styles.chat__messages} onScroll={scrollHandler}>
        {/* @ts-ignore */}
        {messages.map(m => <Message key={m.id} message={m}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{message: messagesType}> = ({message}) => {
    return <div className={styles.messages__item}>
        <NavLink to={`/Profile?id=${message.userId}`}><img src={message.photo ? message.photo : user_small}/></NavLink>
        <div className={styles.messages__body}>
            <div>
                {message.userName}
            </div>
            <div>
                {message.message}
            </div>
        </div>
    </div>
}

const ChatInputArea = () => {
    let [currentValue, setCurrentValue] = useState('')
    let onSimbolChange = (e: any) => {
        setCurrentValue(e.currentTarget.value)
    }
    return <div className={styles.chat__input}>
        <textarea onKeyDown={(e: any) => {
            if(e.key === 'Enter'){
                sendMessage(currentValue)
                setCurrentValue('')
            }
        }} onChange={onSimbolChange} value={currentValue}/>
        <button onClick={() => {
            sendMessage(currentValue)
            setCurrentValue('')
        }}>Send</button>
    </div>
}

export default ComponentWithAuthRedirectHoc(Chat)