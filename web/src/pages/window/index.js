import React, { useEffect, useState } from 'react'
import { FaSearch ,FaUserPlus, FaEllipsisH} from 'react-icons/fa'
import Chat from '../../components/chat'
import ChatIntro from '../../components/chatIntro'
import ChatItem from '../../components/chatItem'
import NewChat from '../../components/newChat'
import { useAuth } from '../../hooks/Auth'
import { 
    ChatItemContainer,
    Container, 
    ContentSideBarHeader, 
    ListContacts, 
    SearchContainer, 
    SearchContent, 
    SearchInput, 
    SideBar, 
    SideBarHeader, 
    TitleSideBarHeader
} from './styles'

import firebaseApp from '../../firebase'

const Window = () => {

    const [activeChat, setActiveChat] = useState({})
    const [showNewChat, setShowNewChat] = useState(false)
    
    const { db, auth } = firebaseApp()
    
    const {  user, inCall } = useAuth()

    const [chatsList, setChatsList] = useState([])

    const  unsubscribe = db.collection('users')
        .doc(`${user.region}${user.phone}`)
        .onSnapshot(doc => {
        const  data = doc.data()

        if(data){
            setChatsList(data.chats)
        }
    })

    useEffect(() => {
       const unsub = unsubscribe()
       return unsub
    })
   
    return (
        <Container>

            <SideBar>
                <NewChat show={showNewChat} setShow={setShowNewChat}/>
                <SideBarHeader>
                    <TitleSideBarHeader>WeTalk ({chatsList.length})</TitleSideBarHeader>
                    <ContentSideBarHeader>
                        <div onClick={() => setShowNewChat(true)}> 
                            <FaUserPlus size={20} color="#2a2a2e"/>
                        </div>
                        <div>
                            <FaEllipsisH size={20} color="#2a2a2e"/>
                        </div>
                    </ContentSideBarHeader>
                </SideBarHeader>
                <SearchContainer>
                    <SearchContent>
                        <FaSearch size={15} color="#3f3f3f" />
                        <SearchInput type="search" placeholder="Search contact " />
                    </SearchContent>
                </SearchContainer>
                {chatsList && (
                    <ChatItemContainer>
                        {chatsList.map((item, key) => (
                            <ChatItem 
                            item={item} 
                            key={key} 
                            onClick={() => setActiveChat(chatsList[key])}
                            active={activeChat.id === chatsList[key].id}
                            />
                        ))}
                    </ChatItemContainer>
                )}
            </SideBar>
            {activeChat.id ? (
                <Chat activeId={activeChat.id} chats={chatsList}/>
            ): (
                <ChatIntro/>
            )}
        </Container>
    )

}

export default Window