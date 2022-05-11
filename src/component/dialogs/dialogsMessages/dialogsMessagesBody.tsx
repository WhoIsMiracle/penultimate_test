import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAuthIdSelector, getDialogsMessagesSelector } from "../../../redux/selectors";
import styles from  './../dialogs.module.scss'
import Messages from "./dialogsBodyItems/messages";
import MessagesSelectingMode from "./dialogsBodyItems/messagesSelectingMode";


const DialogsMessagesBody = () => {
    let authId = useSelector(getAuthIdSelector)
    let messages = useSelector(getDialogsMessagesSelector)
    const [selectingMode, setSelectingMode] = useState(false)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300)
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

    let [selectedMessages, setSelectedMessages] = useState<Array<string>>([])

    // @ts-ignore
    let messagesMapped = messages.map(message => {
        if(authId == message.senderId){
            return  <Messages   owner={true}
                                key={message.id}
                                message={message} 
                                selectedMessages={selectedMessages}
                                setSelectedMessages={setSelectedMessages}
                                selectingMode={selectingMode}
                                setSelectingMode={setSelectingMode}
                    />
            }else{
                return  <Messages   owner={false}
                                    key={message.id}
                                    message={message} 
                                    selectedMessages={selectedMessages}
                                    setSelectedMessages={setSelectedMessages}
                                    selectingMode={selectingMode}
                                    setSelectingMode={setSelectingMode}
                        />
            }
        }
    )
    return(
        <div 
        //className={styles.messages__body}
        >
            {selectingMode
                ? <MessagesSelectingMode selectedMessages={selectedMessages}
                                         setSelectingMode={setSelectingMode}
                                         setSelectedMessages={setSelectedMessages}
                                         />
                : false
            }
           <div className={styles.dialogs__messages} onScroll={scrollHandler}>
                {messagesMapped}
                <div ref={messagesAnchorRef}></div>
            </div>
        </div>
    )
}

export default DialogsMessagesBody