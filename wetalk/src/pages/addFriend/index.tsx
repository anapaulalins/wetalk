import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import firebase from '../../firebase';
import {
  Container,
  Content,
  InputPhone,
  Label,
  Title,
  Header,
  ContentInput,
  RegionContent,
  RegionText,
  Button,
  TitleButton,
  ButtonClose,
  Optional,
} from './styles';
import {useAuth} from '../../hooks/Auth';
import {Alert} from 'react-native';

const AddFriend = () => {
  const [region, setRegion] = useState('+55');
  const [nameRegion, setNameRegion] = useState('Brazil');
  const [phone, setPhone] = useState('');
  const [nameFriend, setNameFriend] = useState('');

  const navigation = useNavigation();

  const {firestore, auth} = firebase();

  const {user} = useAuth();

  const db = firestore();

  const AddFriendOnList = (phoneNumber: string) => {
    db.collection('users')
      .doc(`${phoneNumber}`)
      .get()
      .then(async doc => {
        const {phone, region, name, avatar} = doc.data();

        user.friends.map(e => {
          if (e.phone === phone) {
            return Alert.alert(`${e.name} já é seu amigo!!`);
          }
        });

        await db
          .collection('users')
          .doc(auth().currentUser?.phoneNumber || undefined)
          .update({
            friends: firestore.FieldValue.arrayUnion({
              name: nameFriend ? nameFriend : name,
              avatar: avatar,
              region: region,
              phone: phone,
            }),
          });

        await db
          .collection('users')
          .doc(`${phoneNumber}`)
          .update({
            friends: firestore.FieldValue.arrayUnion({
              name: user.name,
              avatar: user.avatar,
              region: user.region,
              phone: user.phone,
            }),
          });
        navigation.goBack();
      });
  };

  return (
    <Container>
      <ButtonClose onPress={() => navigation.goBack()}>
        <Icon name="close" size={26} />
      </ButtonClose>
      <Header>
        <Title>Add a friend</Title>
      </Header>
      <Content>
        <ContentInput>
          <Label>Name</Label>
          <InputPhone
            placeholder="Eric Clapson"
            selectionColor="#07c160"
            value={nameFriend}
            onChangeText={text => setNameFriend(text)}
          />
          <Optional>Optional</Optional>
        </ContentInput>
        <ContentInput>
          <Label>Region</Label>
          <RegionContent
            onPress={() =>
              navigation.navigate('region', {
                changeRegion: setRegion,
                changeRegionName: setNameRegion,
              })
            }>
            <RegionText>{`${nameRegion} (${region})`}</RegionText>
          </RegionContent>
        </ContentInput>
        <ContentInput>
          <Label>Phone</Label>
          <InputPhone
            value={phone}
            onChangeText={text => setPhone(text)}
            placeholder="Phone Number"
            selectionColor="#07c160"
            keyboardType="phone-pad"
          />
        </ContentInput>
      </Content>
      <Button onPress={() => AddFriendOnList(`${region}${phone}`)}>
        <TitleButton>Save</TitleButton>
      </Button>
    </Container>
  );
};

export default AddFriend;
