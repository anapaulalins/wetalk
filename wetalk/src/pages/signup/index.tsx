import React, {useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Platform, ActivityIndicator} from 'react-native';
import {
  Container,
  CloseButton,
  Content,
  Title,
  ContentButtons,
  ContentInput,
  ContainerInput,
  Button,
  Label,
  Input,
  VerifyContent,
  RegionContent,
  RegionText,
  TextVerifyNumber,
  PhotoContent,
  PhotoContentImage,
} from './styles';

import firebase from '../../firebase';
import {Alert} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const SignUp = () => {
  const navigation = useNavigation();

  const [region, setRegion] = useState('+55');
  const [nameRegion, setNameRegion] = useState('Brazil');
  const [confirm, setConfirm] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null as any);

  const {auth, firestore, storage} = firebase();

  const db = firestore();

  const users = db.collection('users');

  const verifyPhoneNumber = async (phoneNumber: string) => {
    await auth()
      .verifyPhoneNumber(phoneNumber)
      .on('state_changed', () => {
        setConfirm(true);
      })
      .catch(() => {
        Alert.alert(
          'Numero inválido',
          'Verifique se o número digitado está correto!',
        );
      });
  };

  const createAccount = (uri: string) => {
    try {
      users
        .doc(`${region}${phone}`)
        .set({
          name: name,
          region: region,
          phone: phone,
          friends: [],
          chats: [],
          avatar: uri,
        })
        .then(() => {
          Alert.alert('Usúario cadastrado com sucesso', 'Faça seu login!!!');
          navigation.navigate('login');
        });
    } catch (err) {
      Alert.alert('Erro ao cadastrar usúario, tente novamente!');
      console.log(err);
    }
  };

  const updateUserAvatar = useCallback(imageData => {
    if (imageData.didCancel) {
      return;
    }
    if (imageData.error) {
      return;
    }
    if (!imageData.uri) {
      return;
    }

    const source = {uri: imageData.uri};

    setAvatar(source);

    console.log(imageData);
  }, []);

  const uploadImage = () => {
    setLoading(true);
    const filename = avatar.uri.substring(avatar.uri.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? avatar.uri.replace('file://', '') : avatar.uri;

    const task = storage().ref(`images/${filename}`).putFile(uploadUri);

    task.on(
      'state_changed',
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage()
          .ref('images')
          .child(filename)
          .getDownloadURL()
          .then(uri => {
            createAccount(uri);
          });
      },
    );
  };

  return (
    <Container>
      <CloseButton onPress={() => navigation.goBack()}>
        <Icon name="close" size={26} color="#353838" />
      </CloseButton>
      <Title>Sign up by phone number</Title>
      <Content>
        <ContainerInput>
          <ContentInput>
            <Label>Name</Label>
            <Input
              selectionColor="#07c160"
              placeholder="Eric Clapton"
              value={name}
              onChangeText={text => setName(text)}
            />
          </ContentInput>
          <PhotoContent
            onPress={() =>
              ImagePicker.launchImageLibrary(
                {mediaType: 'photo'},
                updateUserAvatar,
              )
            }>
            {avatar && (
              <PhotoContentImage
                source={{uri: avatar.uri}}
                resizeMethod="resize"
                resizeMode="cover"
              />
            )}

            {!avatar && <Icon name="camera" size={30} color="#999" />}
          </PhotoContent>
        </ContainerInput>
        <ContainerInput>
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
        </ContainerInput>
        <ContainerInput>
          <ContentInput>
            <Label>Phone</Label>
            <Input
              value={phone}
              onChangeText={text => setPhone(text)}
              selectionColor="#07c160"
              keyboardType="phone-pad"
              placeholder="Enter mobile number"
            />
          </ContentInput>
        </ContainerInput>
        {confirm && (
          <VerifyContent>
            <TextVerifyNumber>
              Enter the code sent to your phone
            </TextVerifyNumber>
            <ContentInput>
              <Label>Code</Label>
              <Input
                placeholder="Authentication code"
                selectionColor="#07c160"
                keyboardType="phone-pad"
              />
            </ContentInput>
          </VerifyContent>
        )}
        <ContentButtons>
          <Button
            onPress={() => verifyPhoneNumber(`${region}${phone}`)}
            enabled={!confirm}
            style={{backgroundColor: confirm ? '#dddddd' : '#07c160'}}>
            <Label style={{color: confirm ? '#929090' : '#fff'}}>
              Verify Phone Number
            </Label>
          </Button>
          <Button
            onPress={() => (avatar ? uploadImage() : createAccount(''))}
            enabled={confirm}
            style={{backgroundColor: confirm ? '#07c160' : '#ddd'}}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Label style={{color: confirm ? '#fff' : '#929090'}}>Next</Label>
            )}
          </Button>
        </ContentButtons>
      </Content>
    </Container>
  );
};

export default SignUp;
