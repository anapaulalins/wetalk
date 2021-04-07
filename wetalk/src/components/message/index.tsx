/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../hooks/Auth';

import {Container, MessageDate, MessageItem, MessageText} from './styles';

interface PropsMessage {
  data: {
    text: string;
    author: string;
    timestamp: string;
  };
}

const Message: React.FC<PropsMessage> = props => {
  const {user} = useAuth();

  const [time, setTime] = useState('');

  useEffect(() => {
    let d = new Date(props.data.timestamp.seconds * 1000);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    setTime(
      `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`,
    );
  }, [props.data.timestamp.seconds]);

  return (
    <Container
      style={{
        alignItems:
          user.phone === props.data.author ? 'flex-end' : 'flex-start',
      }}>
      <MessageItem
        style={{
          backgroundColor:
            user.phone === props.data.author ? '#07b95d' : '#fff',
        }}>
        <MessageText>{props.data.text}</MessageText>
        <MessageDate
          style={{color: user.phone === props.data.author && '#418650'}}>
          {time}
        </MessageDate>
      </MessageItem>
    </Container>
  );
};

export default Message;
