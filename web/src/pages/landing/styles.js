import styled from 'styled-components'
import { shade } from 'polished'

import imageBackground from '../../images/moon.jpg'

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`
export const Background = styled.div`
    flex: 1;
    background: url(${imageBackground}) no-repeat center;
    background-size: cover;

`
export const LanguageContainer = styled.div`
    display: flex;
    align-items: flex-end;
    position: absolute;
    left: 70px;
    top: 50px;
`
export const Language = styled.p`
    font-size: 14px;
    letter-spacing: 0.5px;
    color: #f0eae6;
    font-family: 'Bree Serif', serif;
    margin-right: 3px;
`

export const Content = styled.div`
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 110px;
    width: 100%;
`
export const ButtonLogin = styled.button`
    background-color: #58c434;
    padding: 10px 90px;
    border: none;
    border-radius: 5px;

    &:hover{
        background-color: ${shade(0.2, '#58c434')}
    }

`
export const TextButtonLogin = styled.p`
    color: #f0eae6;
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    font-size: 17px;
`

export const ButtonSingUp = styled.button`
    background-color: #f0eae6;
    padding: 10px 90px;
    border: none;
    border-radius: 5px;

    &:hover{
        background-color: ${shade(0.1, '#f0eae6')}
    }
`

export const TextButtonSingUp = styled.p`
    color: #58c434;
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    font-size: 17px;
`