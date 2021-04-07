import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import firebase from '../../firebase';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Message from '../message';
import {
  Container,
  Header,
  HeaderInfo,
  HeaderButtons,
  Body,
  FooterContent,
  InputMessage,
  NameItem,
  Footer,
  HeaderContante,
  ButtonSendMessage,
  Button,
} from './styles';
import {useAuth} from '../../hooks/Auth';

interface PropsDataItem {
  data: {
    id: string;
    name: string;
    imageChat: string;
  };
}

const Chat: React.FC = () => {
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const scrollRef = useRef(null as any);
  const [height, setHeight] = useState(0);
  const route = useRoute();
  const {firestore} = firebase();
  const db = firestore();
  const [dataItem, setDataItem] = useState<PropsDataItem>(route.params);
  const [listMessages, setListMessages] = useState([] as any);
  const {user} = useAuth();

  const unsubscribe = db
    .collection('chats')
    .doc(dataItem.data.id)
    .onSnapshot(doc => {
      const data = doc.data();
      if (data) {
        setListMessages(data.messages);
      }
    });

  useEffect(() => {
    // scrollRef.current.scrollToEnd({animated: true});

    const unsub = unsubscribe();
    return unsub;
  }, [listMessages, unsubscribe, dataItem.data.id]);

  const handleSendMenssage = () => {
    if (message !== '') {
      const now = new Date();

      db.collection('chats')
        .doc(dataItem.data.id)
        .update({
          messages: firestore.FieldValue.arrayUnion({
            author: user.phone,
            text: message,
            timestamp: now,
          }),
        });

      setMessage('');
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContante>
          <HeaderInfo>
            <Button onPress={() => navigation.goBack()}>
              <Icon name="left" size={27} color="#171717" />
            </Button>
            <NameItem>{dataItem.data.name}</NameItem>
          </HeaderInfo>
          <HeaderButtons>
            <Button>
              <IconIonicons name="call" size={25} color="#171717" />
            </Button>
            <Button
              onPress={() =>
                navigation.navigate('videoCall', {
                  room: dataItem.data.id,
                  imageChat: dataItem.data.imageChat,
                  name: dataItem.data.name,
                })
              }>
              <IconIonicons name="videocam" size={28} color="#171717" />
            </Button>
            <Button>
              <IconIonicons
                name="ellipsis-horizontal"
                size={30}
                color="#171717"
              />
            </Button>
          </HeaderButtons>
        </HeaderContante>
      </Header>
      <Body>
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={() => {
            scrollRef.current.scrollToEnd({animated: true});
          }}>
          {listMessages.map((item, key) => (
            <Message key={key} data={item} />
          ))}
        </ScrollView>
      </Body>
      <Footer style={{height: height}}>
        <FooterContent>
          <InputMessage
            placeholder="Write a message"
            selectionColor="#07c160"
            returnKeyType="send"
            multiline={true}
            value={message}
            onChangeText={text => setMessage(text)}
            onContentSizeChange={event => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
            style={{height: height, maxHeight: 120}}
          />
          <ButtonSendMessage onPress={handleSendMenssage}>
            <IconIonicons name="send-sharp" size={32} color="#07c160" />
          </ButtonSendMessage>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default Chat;
