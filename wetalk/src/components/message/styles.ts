import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const MessageItem = styled.View`
  flex-direction: column;
  border-radius: 10px;
  padding: 3px;
  max-width: 75%;
  background-color: blue;
`;

export const MessageText = styled.Text`
  margin: 5px 40px 5px 5px;
  font-size: 14px;
  color: #171717;
`;

export const MessageDate = styled.Text`
  font-size: 11px;
  color: #999;
  margin-right: 5px;
  text-align: right;
  height: 15px;
  margin-top: -15px;
`;
