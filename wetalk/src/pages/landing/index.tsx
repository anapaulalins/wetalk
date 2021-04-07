import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Content,
  ButtonLogin,
  ButtonSingUp,
  ImageBackground,
  TextButtonLogin,
  TextButtonSingUp,
} from './styles';

import Moon from '../../images/lua.jpg';

const Lading = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <ImageBackground source={Moon} resizeMode="cover" />
      <Content>
        <ButtonLogin onPress={() => navigation.navigate('login')}>
          <TextButtonLogin>Log In</TextButtonLogin>
        </ButtonLogin>
        <ButtonSingUp onPress={() => navigation.navigate('signup')}>
          <TextButtonSingUp>Sing Up</TextButtonSingUp>
        </ButtonSingUp>
      </Content>
    </Container>
  );
};

export default Lading;
