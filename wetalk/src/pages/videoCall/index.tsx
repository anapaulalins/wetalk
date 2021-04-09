/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/core';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  mediaDevices,
} from 'react-native-webrtc';

import io from 'socket.io-client';
import firebaseApp from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Dimensions} from 'react-native';

import Video from '../../components/video';

import {
  CameraButton,
  Container,
  ControlsButton,
  LocalVideo,
  LocalVideoButton,
  MicButton,
  RemoteName,
  RemoteVideo,
  RemoteVideoImage,
  Close,
} from './styles';

const dimensions = Dimensions.get('window');

const VideoCall: React.FC = () => {
  const [localStream, setLocalStream] = useState(null as any);
  const [remoteStream, setRemoteStream] = useState(null as any);

  const [peerConnections, setPeerConnections] = useState({} as any);

  const [camera, setCamera] = useState({camera: true});
  const [mic, setmic] = useState({mic: true});

  const route = useRoute();
  const navigation = useNavigation();
  const [dataItem] = useState(route.params);

  const socket = useRef(null as any);

  const pc_config = {
    iceServers: [
      {
        url: 'stun:stun.l.google.com:19302',
      },
    ],
  };

  const sdpConstraints = {
    mandatory: {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    },
  };

  useEffect(() => {
    if (!localStream) {
      socket.current = io.connect('http://192.168.18.7:3333');

      socket.current.emit('joinVideo', dataItem.room);

      socket.current.on('connection-success', data => {
        const success = stream => {
          console.log(`Stream URL: ${stream.toURL()}`);
          setLocalStream(stream);

          whoisOnline();
        };

        const failure = e => {
          console.log('Error: ', e);
        };

        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
          console.log(sourceInfos);
          let videoSourceId;
          for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (
              sourceInfo.kind == 'videoinput' &&
              sourceInfo.facing == (isFront ? 'front' : 'environment')
            ) {
              videoSourceId = sourceInfo.deviceId;
            }
          }

          mediaDevices
            .getUserMedia({
              audio: true,
              video: {
                mandatory: {
                  minWidth: 500,
                  minHeight: 300,
                  minFrameRate: 30,
                },
                facingMode: isFront ? 'user' : 'environment',
                optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
              },
            })
            .then(success)
            .catch(failure);
        });

        if (data.peerCount >= 1) {
          const {firestore} = firebaseApp();

          const db = firestore();

          db.collection('chats').doc(dataItem.room).update({
            inCall: true,
          });
        }
      });
    }
  }, [localStream, dataItem.room]);

  useEffect(() => {
    if (localStream) {
      socket.current.on('online-peer', socketID => {
        console.log('ONLINE PEERS');
        createPeerConnection(socketID, pc => {
          if (pc) {
            pc.createOffer(sdpConstraints).then(sdp => {
              pc.setLocalDescription(sdp);

              sendToPeer('offer', sdp, {
                local: socket.current.id,
                remote: socketID,
              });
            });
          }
        });
      });

      socket.current.on('offer', data => {
        console.log('OFFER');
        createPeerConnection(data.socketID, pc => {
          pc.addStream(localStream);

          pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(
            () => {
              pc.createAnswer(sdpConstraints).then(sdp => {
                pc.setLocalDescription(sdp);

                sendToPeer('answer', sdp, {
                  local: socket.current.id,
                  remote: data.socketID,
                });
              });
            },
          );
        });
      });

      socket.current.on('answer', data => {
        console.log('ANSWER');
        const pc = peerConnections[data.socketID];

        console.log(peerConnections[data.socketID]);
        console.log(peerConnections);
        console.log(data.socketID);
        if (pc) {
          pc.setRemoteDescription(
            new RTCSessionDescription(data.sdp),
          ).then(() => {});
        }
      });

      socket.current.on('candidate', data => {
        const pc = peerConnections[data.socketID];
        if (pc) {
          pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      });
    }
  }, [localStream, peerConnections]);

  const whoisOnline = () => {
    console.log('ONLINE WHOOOO');
    sendToPeer('onlinePeers', null, {local: socket.current.id});
  };

  const sendToPeer = (messageType, payload, socketID) => {
    socket.current.emit(messageType, {
      socketID,
      payload,
      room: dataItem.room,
    });
  };

  const createPeerConnection = (socketID, callback) => {
    try {
      const pc = new RTCPeerConnection(pc_config);

      console.log(socketID);

      setPeerConnections({...peerConnections, [socketID]: pc});

      pc.onicecandidate = e => {
        if (e.candidate) {
          sendToPeer('candidate', e.candidate, {
            local: socket.id,
            remote: socketID,
          });
        }
      };

      pc.onaddstream = e => {
        setRemoteStream(e.stream);
      };

      pc.close = () => {
        // alert('GONE')
      };

      if (localStream) {
        console.log('LOCAL');
        console.log(localStream);
        pc.addStream(localStream);
      }

      callback(pc);
    } catch (e) {
      console.log('ERROR', e);

      callback(null);
    }
  };

  const stopTracks = stream => {
    if (!stream.getTracks()) {
      return;
    }
    stream.getTracks().forEach(track => track.stop());
  };

  return (
    <Container>
      <Close
        onPress={() => {
          socket.current.close();
          stopTracks(localStream);

          peerConnections &&
            Object.values(peerConnections).forEach(pc => pc.close());

          navigation.goBack();
        }}>
        <Icon name="times" size={25} color="#fdfdfd" />
      </Close>
      <RemoteVideo>
        {remoteStream ? (
          <Video
            mirror={true}
            style={{width: dimensions.width, height: dimensions.height}}
            objectFit="contain"
            streamURL={remoteStream}
          />
        ) : (
          <>
            <RemoteName>{dataItem.name}</RemoteName>
            <RemoteVideoImage
              source={{uri: dataItem.imageChat}}
              resizeMode="contain"
            />
          </>
        )}
      </RemoteVideo>
      <LocalVideo>
        <LocalVideoButton
          onPress={() => localStream._tracks[1]._switchCamera()}>
          {camera.camera && (
            <Video
              zOrder={0}
              objectFit="cover"
              style={{width: 170, height: 250, backgroundColor: 'black'}}
              streamURL={localStream}
            />
          )}
        </LocalVideoButton>
        <ControlsButton>
          <CameraButton
            onPress={() => {
              const videoTrack = localStream
                .getTracks()
                .filter(track => track.kind === 'video');
              videoTrack[0].enabled = !videoTrack[0].enabled;
              setCamera({
                camera: videoTrack[0].enabled,
              });
            }}
            style={{backgroundColor: camera.camera ? '#07c160' : '#FF4500'}}>
            {camera.camera ? (
              <Icon name="video" size={20} color="#fdfdfd" />
            ) : (
              <Icon name="video-slash" size={20} color="#fdfdfd" />
            )}
          </CameraButton>
          <MicButton
            onPress={() => {
              const audioTrack = localStream
                .getTracks()
                .filter(track => track.kind === 'audio');
              audioTrack[0].enabled = !audioTrack[0].enabled;
              setmic({
                mic: audioTrack[0].enabled,
              });
            }}
            style={{backgroundColor: mic.mic ? '#07c160' : '#FF4500'}}>
            {mic.mic ? (
              <Icon name="microphone" size={20} color="#fdfdfd" />
            ) : (
              <Icon name="microphone-slash" size={20} color="#fdfdfd" />
            )}
          </MicButton>
        </ControlsButton>
      </LocalVideo>
    </Container>
  );
};

export default VideoCall;
