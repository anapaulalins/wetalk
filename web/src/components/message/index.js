import React, { useEffect, useState } from 'react'
import {  lighten } from 'polished'
import {Container, MessageDate, MessageText, MessageItem } from './styles'
import { useAuth } from '../../hooks/Auth'

const Message = (props) => {

    const { user } = useAuth()

    const [time, setTime] = useState('') 

    useEffect(() => {
        let d = new Date( props.data.timestamp.seconds * 1000)
        let hours = d.getHours()
        let minutes = d.getMinutes()
        setTime(`${hours < 10 ? `0${hours}` : hours}:${ minutes < 10 ? `0${minutes}` : minutes}`)


    }, [props.data.timestamp.seconds])

    

    return (
        <Container style={{justifyContent: '81986069071' === props.data.author ? 'flex-end' : 'flex-start'}}>
            <MessageItem  style={{ backgroundColor: user.phone === props.data.author ? lighten(0.1, '#58c434') : '#fff'}}>
                <MessageText>{props.data.text}</MessageText>
                <MessageDate style={{color: user.phone === props.data.author && '#418650'}} >{time}</MessageDate>
            </MessageItem>
        </Container>
    )
}

export default Message