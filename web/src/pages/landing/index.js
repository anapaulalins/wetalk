import React from 'react'
import { useHistory} from 'react-router-dom'
import {FaCaretDown } from 'react-icons/fa'

import { Container, Background, LanguageContainer, Language, Content, ButtonLogin, TextButtonLogin, ButtonSingUp, TextButtonSingUp} from './styles'

const Landing = () => {

    const history = useHistory()

    return (
        <Container>
            <Background>
                <LanguageContainer>
                    <Language>English</Language>
                    <FaCaretDown size={15} color='#f0eae6' />
                </LanguageContainer>
                <Content>
                    <ButtonLogin onClick={() => history.push('/login')}>
                        <TextButtonLogin>Log In</TextButtonLogin>
                    </ButtonLogin>
                    <ButtonSingUp onClick={() => history.push('/singup')}>
                        <TextButtonSingUp>Sing Up</TextButtonSingUp>
                    </ButtonSingUp>
                </Content>
            </Background>
        </Container>
    )
}


export default Landing