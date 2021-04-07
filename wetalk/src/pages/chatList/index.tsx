import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from '../../firebase';
import {
  Container,
  Header,
  ContenteHeader,
  Title,
  SearchContainer,
  SearchContent,
  SearchInput,
  Button,
  ListChatContainer,
  FriendList,
  FriendItem,
  FriendAvatar,
  FriendName,
  ListChatContent,
  ListChatHeader,
  ListChatTitle,
  FriendAvatarIconContent,
} from './styles';
import ChatItem from '../../components/chatItem';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks/Auth';

interface PropsArray {
  name: string;
  phone: string;
  region: string;
  avatar: string;
}
interface PropsArrayChats {
  id: string;
  imageChat: string;
  name: string;
  with: string;
}

const ChatList = () => {
  const [listChat, setListChat] = useState([] as any);
  const [friends, setFriends] = useState([] as any);

  const {user} = useAuth();
  const navigation = useNavigation();

  const {firestore} = firebase();

  const db = firestore();

  useEffect(() => {
    setFriends(user.friends);
    setListChat(user.chats);
  }, [user]);

  const {SingOut} = useAuth();

  const newChat = async (item: PropsArray) => {
    if (user.chats) {
      const friend = user.chats.filter(e => e.with === item.phone);

      console.log('FRIEND');
      console.log(item);

      if (friend[0]) {
        console.log('okay');
        return navigation.navigate('chat', {
          data: friend[0],
        });
      }
    }

    const chat = await db.collection('chats').add({
      messages: [],
      users: [user.phone, item.phone],
    });

    db.collection('users')
      .doc(`${user.region}${user.phone}`)
      .update({
        chats: firestore.FieldValue.arrayUnion({
          id: chat.id,
          name: item.name,
          imageChat: item.avatar,
          with: item.phone,
        }),
      });

    db.collection('users')
      .doc(`${item.region}${item.phone}`)
      .update({
        chats: firestore.FieldValue.arrayUnion({
          id: chat.id,
          name: user.name,
          imageChat: user.avatar,
          with: user.phone,
        }),
      });

    navigation.navigate('chat', {
      data: item,
    });
  };

  return (
    <Container>
      <Header>
        <Title>WeTalk ({friends.length})</Title>
        <ContenteHeader>
          <Button onPress={() => navigation.navigate('add')}>
            <Icon name="user-plus" size={25} color="#fdfdfd" />
          </Button>
          <Button onPress={SingOut}>
            <Icon name="ellipsis-h" size={30} color="#fdfdfd" />
          </Button>
        </ContenteHeader>
      </Header>
      {friends.length > 0 && (
        <FriendList>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {friends.map((item: PropsArray) => (
              <FriendItem key={item.phone} onPress={() => newChat(item)}>
                {item.avatar !== '' ? (
                  <FriendAvatar source={{uri: item.avatar}} />
                ) : (
                  <FriendAvatarIconContent>
                    <Icon name="user-alt" size={35} color="#fff" />
                  </FriendAvatarIconContent>
                )}
                <FriendName numberOfLines={2}>{item.name}</FriendName>
              </FriendItem>
            ))}
          </ScrollView>
        </FriendList>
      )}
      <SearchContainer>
        <SearchContent>
          <Icon name="search" size={20} color="#2b2e2c" />
          <SearchInput
            placeholder="Search chat"
            selectionColor="#07c160"
            style={{paddingVertical: 0}}
          />
        </SearchContent>
      </SearchContainer>
      <ListChatContainer>
        <ListChatHeader>
          <ListChatTitle>Chats</ListChatTitle>
          <Button>
            <Icon name="ellipsis-h" size={30} color="#171717" />
          </Button>
        </ListChatHeader>
        {listChat && (
          <ListChatContent>
            {listChat.map((item: PropsArrayChats, key) => (
              <ChatItem
                key={key}
                data={item}
                onPress={() =>
                  navigation.navigate('chat', {
                    data: item,
                  })
                }
              />
            ))}
          </ListChatContent>
        )}
      </ListChatContainer>
    </Container>
  );
};

export default ChatList;
