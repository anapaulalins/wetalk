import React, { useEffect, useRef, useState } from 'react'
import {FaVideo, FaVideoSlash, FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'

const Video = (props) => {

    const videoRef = useRef()
    const [mic, setMic] = useState({mic: true})
    const [camera, setCarema] = useState({camera: true})
    const [VisdeoVisible, setVideoVisible] = useState(true)

    useEffect(() => {
        if (props.videoStream) {
            videoRef.current.srcObject = props.videoStream
        }


        const videoTrack = props.videoStream && props.videoStream.getVideoTracks()
        if (props.videoType === 'remoteVideo' && videoTrack && videoTrack.length) {
    
          videoTrack[0].onmute = () => {

            setVideoVisible(false)
          }
    
          videoTrack[0].onunmute = () => {
            
            setVideoVisible(true)
          }
        }
    
    
        const audioTrack = props.videoStream && props.videoStream.getAudioTracks()
            if (props.videoType === 'remoteVideo' && audioTrack && audioTrack.length) {
            audioTrack[0].onmute = () => {
              console.log('muted')
            }
        }
 
    }, [props.videoStream, props.videoType ])


    const mutemic = (e) => {
        const stream = videoRef.current.srcObject.getTracks().filter(track => track.kind === 'audio')
        setMic((prevState) => {
            if (stream) stream[0].enabled = !prevState.mic
          return {mic: !prevState.mic}
        })
    }

    const mutecamera = (e) => {
        const stream = videoRef.current.srcObject.getTracks().filter(track => track.kind === 'video')
        setCarema((prevState) => {
        if (stream) stream[0].enabled = !prevState.camera
       
          return {camera: !prevState.camera}
        })
    }

    return (
        <div style={{
          background: 'transparent',
          width:  props.videoType === 'localVideo' ? 250 : '100%'  , 
          position: props.videoType === 'localVideo' ? 'fixed' : 'relative',
          right: props.videoType === 'localVideo' ? 30 : 0,
          bottom: props.videoType === 'localVideo' ? 30 : 0,
          zIndex:  props.videoType === 'localVideo' ? 2 : 0,
          }}>
            <video
                id={props.id}
                muted={props.muted}
                autoPlay
                style={{
                    visibility: VisdeoVisible ? 'visible' : 'hidden',
                    ...props.videoStyles,
                  }}
                ref={videoRef}
            > 
            </video>
            {props.videoType === 'localVideo' && (
              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent:'space-around',
                zIndex: 3,
                position: 'absolute',
                bottom: 10,
                }}>
                  <div 
                  style={{
                    cursor: 'pointer', 
                    width: 42,
                    height: 42,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: camera.camera ? ' #58c434' : '#FF4500' }}
                    onClick={mutecamera}
                    >
                    {camera.camera ? (
                      <FaVideo size={20} color="#fff"/>
                    ): (
                      <FaVideoSlash size={20} color="#fff" />
                    )}

                  </div>

                  <div 
                  style={{
                    cursor: 'pointer', 
                    width: 42,
                    height: 42,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: mic.mic ? ' #58c434' : '#FF4500' }}
                    onClick={mutemic}
                    >
                    {mic.mic ? (

                      <FaMicrophone size={20} color="#fff"/>
                    ): (
                      <FaMicrophoneSlash size={20} color="#fff" />
                    )}

                  </div>
              
              </div>
            )}
        </div>
    )
}

export default Video