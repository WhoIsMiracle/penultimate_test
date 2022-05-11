import React, { useState } from "react";
import styles from  './../../dialogs.module.scss'

type propsType = {
    owner: boolean
    message: any
    selectedMessages: Array<string>
    setSelectedMessages: (selectedMessagesId: Array<string>) => void
    selectingMode: boolean
    setSelectingMode: (mode: boolean) => void
}

const Messages: React.FC<propsType> = React.memo(({owner, message, selectedMessages, setSelectedMessages,
                                         selectingMode, setSelectingMode}) => {
    let [itemIsInArray, setItemIsInArray] = useState<null | boolean>(null)
    if(selectedMessages[0] === 'clear' && itemIsInArray === true){
        setItemIsInArray(false)
    }
    let selectedMessagesId = [] as Array<string>
    const checkItemInArray = (arr: Array<any>, item: any) => {
        let include = arr.includes(item)
        if(include === true){
            return new Promise((resolve, reject) => {
                setItemIsInArray(true)
                resolve(true)
            })
        }else{
            return new Promise((resolve, reject) => {
                setItemIsInArray(false)
                resolve(false)
            })
        }
    }
    const setSelectedMessageFunc = (messageId: string, itemIsInArray: boolean) => {
        if(selectedMessages.length >= 1 && selectedMessages[0] !== 'clear'){
            if(!itemIsInArray){
                selectedMessagesId = [...selectedMessages]
                selectedMessagesId.push(messageId)
                setSelectedMessages(selectedMessagesId)
            }
        }else{
            selectedMessagesId.push(messageId)
            setSelectedMessages(selectedMessagesId)
        }
    }
    const ActiveSelectMode = (e: any) => {
        e.preventDefault()
        setSelectingMode(true)
    }
    const returnTime = (time: any) => {
        let hourSimbol = Number(time[1]) + 3
        let correctedTimeFiveSymbol = time[0] + hourSimbol + time.substr(2)
        let correctedTimeSixSymbol = hourSimbol + time.substr(2)
        console.log(time)
        if(time.length === 5){
            return correctedTimeFiveSymbol
        }else{
            return correctedTimeSixSymbol
        }
    }
    return(
        <div className={owner ? styles.messages__myWrap : styles.messages__friendWrap}
                onContextMenu={ActiveSelectMode}
                onClick={selectingMode
                    ? () => {
                        checkItemInArray(selectedMessages, message.id).then((itemIsInArrayValue: any) => {
                            setSelectedMessageFunc(message.id, itemIsInArrayValue)
                            })
                    }
                    : () => {}
                }
        >
            <div className={itemIsInArray ? styles.messageMy__selected :
                                          owner ? styles.messages__my : styles.messages__friend}>
                <div className={itemIsInArray ? styles.message__selected 
                                          : owner ? styles.messages__my : styles.messages__friend}>
                    {message.body}
                </div>
                <span className={styles.messages__time }>
                    {
                        returnTime(message.addedAt.substr(11, 5))
                    }
                </span>
                {message.viewed 
                    ? <span className={styles.viewed}>{'✔'}</span> 
                    : <span className={styles.unviewed}>{'🔵'}</span>}
            </div>
        </div>
    )
})

export default Messages