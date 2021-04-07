/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Container,
  Button,
  Content,
  Input,
  Label,
  Title,
  ContentInput,
  RegionContent,
  RegionText,
  ContentButtons,
  TextVerifyNumber,
  VerifyContent,
  CloseButton,
} from './styles';

import {useAuth} from '../../hooks/Auth';

const Login: React.FC = () => {
  const [region, setRegion] = useState('+55');
  const [nameRegion, setNameRegion] = useState('Brazil');
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation();

  const {signInWithPhoneNumber, logon, confirmCode, enabled} = useAuth();

  // useFocusEffect(() => {
  //   console.log(region);
  // });

  return (
    <>
      <Container>
        <CloseButton onPress={() => navigation.goBack()}>
          <Icon name="close" size={26} color="#353838" />
        </CloseButton>
        <Title>Log In Via Mobile Number</Title>
        <Content>
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
            <Input
              value={phone}
              onChangeText={text => setPhone(text)}
              selectionColor="#07c160"
              keyboardType="phone-pad"
              placeholder="Enter mobile number"
            />
          </ContentInput>
          {confirmCode && (
            <VerifyContent>
              <TextVerifyNumber>
                Enter the code sent to your phone
              </TextVerifyNumber>
              <ContentInput>
                <Label>Code</Label>
                <Input
                  value={code}
                  onChangeText={text => setCode(text)}
                  placeholder="Authentication code"
                  selectionColor="#07c160"
                  keyboardType="phone-pad"
                />
              </ContentInput>
            </VerifyContent>
          )}
          <ContentButtons>
            <Button
              onPress={() => signInWithPhoneNumber(`${region}${phone}`)}
              enabled={!enabled}
              style={{backgroundColor: confirmCode ? '#dddddd' : '#07c160'}}>
              <Label style={{color: confirmCode ? '#929090' : '#fff'}}>
                Verify Phone Number
              </Label>
            </Button>
            <Button
              onPress={() => logon(code)}
              enabled={enabled}
              style={{backgroundColor: confirmCode ? '#07c160' : '#ddd'}}>
              <Label style={{color: confirmCode ? '#fff' : '#929090'}}>
                Next
              </Label>
            </Button>
          </ContentButtons>
        </Content>
      </Container>
    </>
  );
};

export default Login;
