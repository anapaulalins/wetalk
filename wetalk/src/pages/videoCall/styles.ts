import styled from 'styled-components/native';

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const RemoteVideo = styled.View`
  flex: 1;
  width: ${windowWidth};
  height: ${windowHeight};
  background-color: #08994e;
  align-items: center;
`;

export const RemoteName = styled.Text`
  font-size: 30px;
  position: absolute;
  top: 100px;
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const RemoteVideoImage = styled.Image`
  width: ${windowWidth};
  height: ${windowHeight};
`;

export const LocalVideo = styled.View`
  position: absolute;
  z-index: 1;
  bottom: 10px;
  width: 170px;
  height: 250px;
  background-color: black;
  right: 10px;
`;

export const LocalVideoButton = styled.TouchableOpacity`
  position: relative;
`;

export const ControlsButton = styled.View`
  justify-content: space-around;
  width: 100%;
  background-color: transparent;
  align-items: center;
  flex-direction: row;
  position: absolute;
  bottom: 10px;
`;

export const MicButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const CameraButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 55px;
  left: 30px;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background-color: #ff4500;
`;
