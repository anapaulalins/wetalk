import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ededed;
  padding: 0 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 26px;
  height: 26px;
  position: absolute;
  left: 15px;
  top: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const Content = styled.View`
  margin-top: 10px;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.Text`
  color: #171717;
  font-size: 25px;
  margin-top: 110px;
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 15px;
`;

export const PhotoContent = styled.TouchableOpacity`
  background-color: #ddd;
  width: 60px;
  height: 60px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
`;

export const PhotoContentImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 3px;
`;

export const ContentInput = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  padding-bottom: 7px;
`;

export const RegionContent = styled.TouchableOpacity`
  flex: 1;
  margin-left: 30px;
  height: 100%;
  justify-content: center;
`;

export const RegionText = styled.Text`
  color: #07c160;
  font-size: 16px;
`;

export const VerifyContent = styled.View`
  margin-top: 5px;
  min-height: 70px;
`;

export const TextVerifyNumber = styled.Text`
  color: #418650;
  font-size: 15px;
  margin-bottom: 5px;
`;

export const Label = styled.Text`
  color: #171717;
  font-size: 17px;
`;

export const Input = styled.TextInput`
  flex: 1;
  padding: 0;
  margin-left: 30px;
  color: #171717;
  font-size: 15px;
`;

export const ContentButtons = styled.View`
  width: 100%;
  border-top-width: 1px;
  border-top-color: #ddd;
`;

export const Button = styled(RectButton)`
  background-color: red;
  width: 100%;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
`;
