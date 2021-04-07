import React from 'react';

import {RTCView} from 'react-native-webrtc';

import {View} from 'react-native';

const Video = props => {
  const _streamURL = props.streamURL && props.streamURL.toURL();

  return (
    <View>
      <RTCView
        key={props.key}
        zOrder={props.zOrder}
        objectFit={props.objectFit}
        style={{...props.style}}
        streamURL={_streamURL}
      />
    </View>
  );
};

export default Video;
