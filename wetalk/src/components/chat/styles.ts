import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const Header = styled.View`
  background-color: #ededed;
  height: 95px;
  padding: 0 15px;
  padding-bottom: 15px;
  justify-content: flex-end;
`;

export const Button = styled.TouchableOpacity``;

export const HeaderContante = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderInfo = styled.View`
  flex-direction: row;
`;

export const HeaderButtons = styled.View`
  flex-direction: row;
  width: 115px;
  justify-content: space-between;
`;

export const NameItem = styled.Text`
  font-size: 17px;
  margin-left: 10px;
  font-weight: 700;
  color: #171717;
`;

export const Body = styled.View`
  flex: 1;
  padding: 7px 5px;
  padding-top: 3px;
  background-color: #ededed;
`;

export const Footer = styled.View`
  background-color: #fff;
  height: 50px;
  max-height: 120px;
`;

export const FooterContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 100%;
  padding: 0 5px;
`;

export const ButtonSendMessage = styled.TouchableOpacity`
  margin-left: 10px;
  margin-bottom: 3px;
`;

export const InputMessage = styled.TextInput`
  flex: 1;
  margin-right: 5px;
  background-color: #fff;
`;
