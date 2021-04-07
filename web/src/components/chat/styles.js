import styled from 'styled-components'
import {  lighten, shade } from 'polished'


export const Container = styled.div`
    background-color:  #efe8e3;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
`
export const Header = styled.div`
    height: 55px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${shade(0.1, '#efe8e3')};
    justify-content: space-between;
`

export const HeaderInfo = styled.div`
    display: flex;
    align-items: center;
`

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    margin-right: 15px;
`

export const ChatName = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 15px;
`

export const HeaderButtons = styled.div`
    display: flex;
    align-items: center;

    div{
        
        margin-left: 10px;
        cursor: pointer;
        padding: 6px;
        display: flex;
        align-items: center;
        border-radius: 50%;

        &:hover{
            background-color: #f5f5f5;
        }
    }

    svg {
      color: #2a2a2e;
      width: 25px;
      height: 25px;
    }
`


export const Body = styled.div`
    flex: 1;
    overflow-y: auto;
    background-color: #efe8e3;
    padding: 20px 20px;

    &::-webkit-scrollbar{
            width: 10px;
            height: 10px;
            
        }

    &::-webkit-scrollbar-thumb{
        background-color: rgba(0, 0, 0, 0.2);
    }
`

export const Footer = styled.div`
    position: relative;
    height: 70px;
    display: flex;
    align-items: center;
    border-top: 1px solid ${shade(0.1, '#efe8e3')};
    background-color: #fff;
    padding-right: 15px;
    padding: 0 15px;

`

export const FooterContentEmoji = styled.div``

export const EmojiArea = styled.div`
    position: absolute;
    bottom: 70px;
`

export const FooterContentButton = styled.div`
    margin-left: 15px;
   
`
export const FooterInputArea = styled.div`
    flex: 1;
    margin-left: 10px;

    textarea{
        background-color: transparent;
        width: 100%;
        resize: none;
        border: none;
        height: 55px;
        padding: 8px;
        padding-left: 10px;
        padding-bottom: 5px;
        overflow: hidden;
        overflow-y: auto;
        color: #2a2a2e;
        font-family: 'Bree Serif', serif;
        font-size: 14px;
        border-bottom: 2px solid #418650;

        &::-webkit-scrollbar{
            width: 7px;
            height: 7px;
            
        }

        &::-webkit-scrollbar-thumb{
            background-color:  rgba(0, 0, 0, 0.2);
        }
    }
`

export const BodyBottom = styled.div`
    padding-bottom: 5px;
`

