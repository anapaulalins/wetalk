import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-between;
`;

export const ImageBackground = styled.Image`
  width: 100%;
  height: 100%;
  flex: 1;
`;

export const Content = styled.View`
  position: absolute;
  bottom: 25px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

export const ButtonLogin = styled(RectButton)`
  background-color: red;
  align-items: center;
  width: 135px;
  height: 50px;
  justify-content: center;
  border-radius: 5px;
  background-color: #07c160;
`;

export const TextButtonLogin = styled.Text`
  color: #fff;
  font-size: 17px;
`;

export const ButtonSingUp = styled(RectButton)`
  background-color: red;
  align-items: center;
  width: 135px;
  height: 50px;
  justify-content: center;
  border-radius: 5px;
  background-color: #fff;
`;

export const TextButtonSingUp = styled.Text`
  color: #07c160;
  font-size: 17px;
`;
