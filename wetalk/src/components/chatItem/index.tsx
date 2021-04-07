import React, {useEffect, useState} from 'react';
import firebase from '../../firebase';
import {
  Container,
  Content,
  DateItem,
  Avatar,
  LastMsg,
  LastMsgContent,
  NameItem,
  ContentItem,
  InCall,
} from './styles';

import IconIonicons from 'react-native-vector-icons/Ionicons';

interface PropsChatItem {
  onPress: () => void;
  data: {
    name: string;
    id: string;
    imageChat: string;
  };
}

const ChatItem: React.FC<PropsChatItem> = props => {
  const {firestore} = firebase();

  const [lastMessage, setLastMessage] = useState('');
  const [time, setTime] = useState('');
  const [inCallApp, setInCallApp] = useState(false);

  const db = firestore();

  useEffect(() => {
    return db
      .collection('chats')
      .doc(props.data.id)
      .onSnapshot(doc => {
        const {messages, inCall} = doc.data();

        setInCallApp(inCall);

        if (messages.length > 0) {
          const last = messages[messages.length - 1];

          let d = new Date(last.timestamp.seconds * 1000);

          let hours = d.getHours();
          let minutes = d.getMinutes();

          setLastMessage(last.text);
          setTime(
            `${hours < 10 ? `0${hours}` : hours}:${
              minutes < 10 ? `0${minutes}` : minutes
            }`,
          );
        }
      });
  });

  return (
    <Container onPress={props.onPress}>
      {inCallApp && (
        <InCall>
          <IconIonicons name="videocam" size={20} color="#418650" />
        </InCall>
      )}
      <Avatar source={{uri: props.data.imageChat}} resizeMode="cover" />
      <Content>
        <ContentItem>
          <NameItem>{props.data.name}</NameItem>
          <DateItem>{time}</DateItem>
        </ContentItem>
        <ContentItem>
          <LastMsgContent>
            <LastMsg numberOfLines={1}>{lastMessage}</LastMsg>
          </LastMsgContent>
        </ContentItem>
      </Content>
    </Container>
    // <>
    //   {messages.length > 0 && (
    //     <Container onPress={props.onPress}>
    //       <Avatar source={{uri: props.data.imageChat}} resizeMode="cover" />
    //       <Content>
    //         <ContentItem>
    //           <NameItem>{props.data.name}</NameItem>
    //           <DateItem>{time}</DateItem>
    //         </ContentItem>
    //         <ContentItem>
    //           <LastMsgContent>
    //             <LastMsg numberOfLines={1}>{lastMessage}</LastMsg>
    //           </LastMsgContent>
    //         </ContentItem>
    //       </Content>
    //     </Container>
    //   )}
    // </>
  );
};

export default ChatItem;
