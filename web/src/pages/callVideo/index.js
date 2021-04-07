import React, { Component } from 'react';

import io from 'socket.io-client'
import firebaseApp from '../../firebase'
import Video from '../../components/video'
import {Container, Content , TextContent, Close} from './styles'
import { FaTimes } from 'react-icons/fa';

class CallVideo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,    
      remoteStream: null,    

      remoteStreams: [],   
      peerConnections: {},  

      pc_config: {
        "iceServers": [
          {
            urls : 'stun:stun.l.google.com:19302'
          }
        ]
      },

      sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
      },
      disconnected: false
    }

    this.serviceIP = 'http://localhost:3333'

   
    this.socket =  io.connect(this.serviceIP, {query: {room: this.props.room }})


    
  }

  getLocalStream = () => {
    const success = (stream) => {
      window.localStream = stream
   
      this.setState({
        localStream: stream
      })

      this.whoisOnline()
    }

   
    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

  
    const constraints = {
      audio: true,
      video: true,
      
      options: {
        mirror: true,
      }
    }

   
    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }

  whoisOnline = () => {
    this.sendToPeer('onlinePeers', null, {local: this.socket.id})
  }

  sendToPeer = (messageType, payload, socketID) => {
    this.socket.emit(messageType, {
      socketID,
      payload,
      room: this.props.room
    })
  }

  createPeerConnection = (socketID, callback) => {

    try {
      let pc = new RTCPeerConnection(this.state.pc_config)


      this.setState({
        peerConnections: { ...this.state.peerConnections, [socketID]: pc }
      })

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          this.sendToPeer('candidate', e.candidate, {
            local: this.socket.id,
            remote: socketID
          })
        }
      }

      pc.ontrack = (e) => {
     
        let remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}

        const videoExist = this.state.remoteStreams.filter(stream => stream.id === socketID)

        console.log('VIDEO EXIST')
        console.log(videoExist)

        if (videoExist.length) {
          remoteStream = videoExist[0].stream
          remoteStream.addTrack(e.track, remoteStream)

          console.log('REMOTE STREAM ')
          console.log(videoExist[0].stream)

          remoteVideo = {
            ...videoExist[0],
            stream: remoteStream,
          }

          console.log('VIDEO remote')
          console.log(remoteVideo)

          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            console.log(_remoteVideo.id)
            console.log(remoteVideo.id)

            return _remoteVideo.id === remoteVideo.id ? remoteVideo || _remoteVideo : remoteVideo
            
          })
        } else {
         
          remoteStream = new MediaStream()
          remoteStream.addTrack(e.track, remoteStream)

          remoteVideo = {
            id: socketID,
            name: socketID,
            stream: remoteStream,
          }

          console.log('VIDEO remote')
          console.log(remoteVideo)

          remoteStreams = [...this.state.remoteStreams, remoteVideo]
        }

        this.setState(prevState => {
          return {
            remoteStream: e.streams[0],
            remoteStreams
          }
        })
      }

      pc.close = () => {
        // alert('GONE')
      }

      if (this.state.localStream)
        
        this.state.localStream.getTracks().forEach(track => pc.addTrack(track, this.state.localStream))

      callback(pc)

    } catch(e) {
      console.log('Something went wrong', e)
  
      callback(null)
    }
  }

  componentDidMount = () => {

    this.socket.emit('joinVideo', this.props.room )

    this.socket.on('connection-success', data => {
      this.getLocalStream()

      console.log(data.peerCount)
      if(data.peerCount >= 1){
        const { db} = firebaseApp()
        
        db.collection('chats').doc(this.props.room).update({
          inCall: true
        })
      }

    })

    this.socket.on('online-peer', socketID => {
      console.log('connected peers ...', socketID)
      this.createPeerConnection(socketID, pc => {
     
          if (pc)
            pc.createOffer(this.state.sdpConstraints)
              .then(sdp => {
                pc.setLocalDescription(sdp)

                this.sendToPeer('offer', sdp, {
                  local: this.socket.id,
                  remote: socketID
                })
          })
        })
    })

    this.socket.on('offer', data => {
      this.createPeerConnection(data.socketID, pc => {
        pc.addStream(this.state.localStream)

        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              pc.setLocalDescription(sdp)

              this.sendToPeer('answer', sdp, {
                local: this.socket.id,
                remote: data.socketID
              })
            })
        })
      })
    })

    this.socket.on('answer', data => {
      const pc = this.state.peerConnections[data.socketID]
      console.log(pc)
      if(pc){
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{})
      }
    })

    this.socket.on('candidate', (data) => {
      const pc = this.state.peerConnections[data.socketID]
      if (pc)
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    })

  }

  stopTracks = (stream) => {
    stream.getTracks().forEach(track => track.stop())
  }
  
  render() {
    if (this.state.disconnected) {
        this.socket.close()
     
        this.stopTracks(this.state.localStream)

        this.state.remoteStreams.forEach(rVideo => this.stopTracks(rVideo.stream))

        this.state.peerConnections && Object.values(this.state.peerConnections).forEach(pc => pc.close())
        this.props.videoHide(false)
    }

    return (
      <Container style={{right: this.props.videoHide ? 0 : '75%'}}>
        <Video
          videoStyles={{
            position: 'relative',
            width: 250,
            height: 250,
          }}
          videoType='localVideo'
          videoStream={this.state.localStream}
          autoPlay>
        </Video>
          

        {!this.state.remoteStream ? (
          <Content>
            <TextContent>{this.props.name}</TextContent>
          </Content>
        ) : (
        <Video
          videoStyles={{
            width: '100%',
            backgroundColor: 'black'
          }}
          videoType='remoteVideo'
          videoStream={this.state.remoteStream}
          autoPlay>
        </Video>

        )}

        <Close onClick={() => this.setState({disconnected: true})}>
          <FaTimes size={23} color="#fdfdfd" />
        </Close>

      </Container>
      
    )
  }
}

export default CallVideo;


