import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  height: 65px;
  align-items: center;
  padding: 0 10px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(221, 221, 221, 0.6);
  position: relative;
`;

export const Content = styled.View`
  flex: 1;
  margin-left: 15px;
  flex-wrap: wrap;
  min-width: 0;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

export const ContentItem = styled.View`
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
`;

export const NameItem = styled.Text`
  color: #171717;
  font-size: 15px;
`;

export const DateItem = styled.Text`
  color: #999;
  font-size: 12px;
`;

export const LastMsgContent = styled.View`
  width: 100%;
  margin-top: 3px;
`;

export const LastMsg = styled.Text`
  overflow: hidden;
  margin: 0;
  color: #999;
  font-size: 13px;
`;

export const InCall = styled.View`
  position: absolute;
  right: 20px;
  bottom: 8px;
`;
