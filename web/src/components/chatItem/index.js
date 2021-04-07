import React, { useEffect, useState } from 'react'
import {Container , Avatar, Content, ContentItem, NameItem, DateItem, LastMgs, Message, InCall} from './styles'
import { IoIosVideocam} from 'react-icons/io'

import firebase from '../../firebase'

const ChatItem = (props) => {

    const { db } = firebase()

    const [lastMessage, setLastMessage] = useState('')
    const [time, setTime] = useState('')
    const [inCallApp, setInCallApp] =  useState(false)

    useEffect(() => {
        return db
          .collection('chats')
          .doc(props.item.id)
          .onSnapshot(doc => {
            const {messages, inCall} = doc.data()

            setInCallApp(inCall)

            if (messages.length > 0) {
              const last = messages[messages.length - 1]
    
              let d = new Date(last.timestamp.seconds * 1000)
    
              let hours = d.getHours()
              let minutes = d.getMinutes()
        
              setLastMessage(last.text)
              setTime(`${hours < 10 ? `0${hours}` : hours}:${ minutes < 10 ? `0${minutes}` : minutes}`)
            }
          });

         
      }, [props.item.id, db]);

    return (
      <Container
        onClick={props.onClick}
        style={{backgroundColor: props.active && '#58c434'}}
      >
            {inCallApp &&  (
             <InCall>
               <IoIosVideocam size={25} color="#418650" />
             </InCall>
            )}
            <Avatar src={`${props.item.imageChat}`} alt="" />
            <Content>
                <ContentItem>
                    <NameItem style={{color: props.active && '#f5f5f5'}}>{props.item.name}</NameItem>
                    <DateItem style={{color: props.active && '#f5f5f5'}}>{time}</DateItem>
                </ContentItem>
                <ContentItem>
                    <LastMgs>
                        <Message style={{color: props.active && '#f5f5f5'}}>{lastMessage}</Message>
                    </LastMgs>
                </ContentItem>
            </Content>
      </Container>
    )

}

export default ChatItem