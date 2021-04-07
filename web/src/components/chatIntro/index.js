import React from 'react'
import Icon from '../../images/icon.png'
import { FaGooglePlay , FaApple} from 'react-icons/fa'


import { Container , IconImage, Title, AppLink, TextButtonLink, ButtonsLink, TextButtonStrong} from './styles'

const ChatIntro = () => {

    return (
        <Container>
            <IconImage src={Icon} alt="" />

            <Title>For a better experience download the App</Title>
            <ButtonsLink>
                <AppLink>
                    <FaGooglePlay size={25} color="#efe8e3" />
                    <TextButtonLink>Download on the 
                        <TextButtonStrong> Play Store</TextButtonStrong>
                    </TextButtonLink>
                </AppLink>
                <AppLink>
                    <FaApple size={30} color="#efe8e3" />
                    <TextButtonLink>Download on the 
                        <TextButtonStrong> App Store</TextButtonStrong>
                    </TextButtonLink>
                </AppLink>
            </ButtonsLink>
        </Container>
    )
}

export default ChatIntro