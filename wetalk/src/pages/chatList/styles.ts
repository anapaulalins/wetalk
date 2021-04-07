import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #07c160;
`;

export const Header = styled.View`
  flex-direction: row;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  margin-top: 35px;
  height: 50px;
  background-color: #07c160;
`;

export const Button = styled.TouchableOpacity``;

export const ContenteHeader = styled.View`
  flex-direction: row;
  align-items: center;
  width: 80px;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #fdfdfd;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const SearchContainer = styled.View`
  align-items: center;
  margin-top: 15px;
  height: 40px;
`;

export const SearchContent = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  width: 94%;
  padding: 0 15px;
  border-radius: 20px;
  height: 40px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  height: 40px;
`;

export const ListChatContainer = styled.View`
  flex: 1;
  margin-top: 25px;
  background-color: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const ListChatContent = styled.View`
  margin-top: 10px;
`;

export const ListChatHeader = styled.View`
  margin-top: 20px;
  padding: 0 30px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ListChatTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #171717;
`;

export const FriendList = styled.View`
  height: 90px;
  padding-left: 20px;
  margin-top: 8px;
  margin-top: 7px;
`;

export const FriendItem = styled.TouchableOpacity`
  margin-right: 5px;
  align-items: center;
  width: 80px;
`;

export const FriendAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

export const FriendAvatarIconContent = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: 'rgba(221,221,221,0.6)';
  align-items: center;
  justify-content: center;
`;

export const FriendName = styled.Text`
  margin-top: 5px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  font-size: 12px;
`;
