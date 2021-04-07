import React, { useState, useEffect, useRef } from 'react'
import { IoIosVideocam, IoIosCall, IoMdSend, IoMdCloseCircleOutline} from 'react-icons/io'
import { FaRegGrin } from 'react-icons/fa'
import { MdMoreVert} from 'react-icons/md'
import EmojiPicker from 'emoji-picker-react'
import Message from '../message'
import { 
    Container,
    Header,
    HeaderInfo,
    HeaderButtons,
    Avatar,
    ChatName,
    Body,
    Footer,
    FooterInputArea,
    FooterContentButton,
    EmojiArea,
    FooterContentEmoji,
    BodyBottom
} from './styles'

import io from 'socket.io-client'

import firebaseApp from '../../firebase'
import { useAuth } from '../../hooks/Auth'
import CallVideo from '../../pages/callVideo'

let socket;

const Chat = (props) => {

    const { db, firebase } = firebaseApp()
    const {user} = useAuth()

    const bodyBottomRef = useRef()
    const textAreaRef = useRef()
    const [listMessages, setListMessages] = useState([] )
    const [chatItem, setChatItem] = useState({})
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [videoCallShow, setVideoCallSHow] = useState(false)
    const [room, setRoom] = useState('');
    const ENDPOINT = 'http://localhost:3333'

    useEffect(() => {
      socket = io.connect(ENDPOINT, {query: {room: props.activeId }});

      setRoom(props.activeId)

      socket.emit('join', room)

      socket.on('prevMessage', data => {
        setListMessages(data)
        bodyBottomRef.current.scrollIntoView({
          behavior: "smooth",
        })
      })
      
    }, [props.activeId, room])
    
  
    useEffect(() => {
        const findChat = props.chats.filter(e => e.id === props.activeId)
        setChatItem(findChat[0])

    }, [ props.activeId, chatItem, props.chats])

   
    const handleEmojiClick = (e, emojiObject) => {
        setMessage(message + emojiObject.emoji)
    }

    const handleSendMenssage = () => {
        if (message !== '') {
          const now = new Date();

          db.collection('chats')
            .doc(props.activeId)
            .update({
              messages: firebase.firestore.FieldValue.arrayUnion({
                author: user.phone,
                text: message,
                timestamp: now,
              }),
            });
    
          setMessage('');
          setEmojiOpen(false)
        }
      };

      const handleUserKeyPress = e => {
        if (e.key === "Enter" && !e.shiftKey) {
          // e.preventDefault();
          handleSendMenssage() 
        }
    };

    return (
       <Container>
         {videoCallShow && <CallVideo videoHide={setVideoCallSHow} name={chatItem.name} room={props.activeId}/>}
          <Header>
              <HeaderInfo>
                  <Avatar src={chatItem.imageChat}/>
                  <ChatName>{chatItem.name}</ChatName>
              </HeaderInfo>
              <HeaderButtons>
                  <div>
                    <IoIosCall />
                  </div>
                  <div>
                    <IoIosVideocam onClick={() => setVideoCallSHow(true)} />
                  </div>
                  <div>
                    <MdMoreVert/>
                  </div>
              </HeaderButtons>
          </Header>
          <Body>
              {listMessages.map((item, key) => (
                  <Message key={key} data={item} />
              ))}
            <BodyBottom ref={bodyBottomRef} />
          </Body>

            {emojiOpen && (
                <EmojiArea>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                    />
                </EmojiArea>
            )}

          <Footer>
                <FooterContentEmoji>
                    {emojiOpen ? (
                        <IoMdCloseCircleOutline
                            onClick={() => setEmojiOpen(false)} 
                            size={23} 
                            color="#2a2a2e" 
                            style={{cursor: 'pointer'}}
                        />
                    ) : (
                        <FaRegGrin 
                            onClick={() => setEmojiOpen(true)}
                            size={23} 
                            color="#2a2a2e" 
                            style={{cursor: 'pointer'}}
                        />
                    )}
                </FooterContentEmoji>
                <FooterInputArea>
                    <textarea
                    onKeyPress={handleUserKeyPress}
                    value={message}
                    onChange={(text) => setMessage(text.target.value) }
                    rows="1" 
                    wrap="physical" 
                    placeholder="Write a message..."></textarea>
                </FooterInputArea>
                <FooterContentButton onClick={handleSendMenssage}>
                    <IoMdSend size={28} color="#2a2a2e" style={{cursor: 'pointer'}}/>
                </FooterContentButton>
          </Footer>
       </Container>
    )
}

export default Chat