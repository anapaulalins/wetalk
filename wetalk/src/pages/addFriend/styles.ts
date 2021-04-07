import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ededed;
`;

export const Header = styled.View`
  margin-top: 120px;
  padding: 0 20px;
`;

export const Title = styled.Text`
  color: #171717;
  font-size: 25px;
`;

export const Content = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const ContentInput = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  height: 45px;
  padding-bottom: 7px;
  position: relative;
`;

export const InputPhone = styled.TextInput`
  flex: 1;
  padding: 0;
  margin-left: 30px;
  color: #171717;
  font-size: 15px;
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

export const Label = styled.Text`
  color: #171717;
  font-size: 17px;
`;

export const Button = styled(RectButton)`
  align-self: center;
  background-color: #07c160;
  width: 90%;
  align-items: center;
  margin-top: 40px;
  padding: 10px;
  border-radius: 4px;
`;

export const TitleButton = styled.Text`
  color: #fff;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: 700;
`;

export const ButtonClose = styled.TouchableOpacity`
  position: absolute;
  top: 55px;
  left: 20px;
`;

export const Optional = styled.Text`
  position: absolute;
  right: 0;
  top: 0;
  color: #07c160;
  font-size: 12px;
`;
