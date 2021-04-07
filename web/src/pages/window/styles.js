import styled from 'styled-components'
import {  lighten, shade } from 'polished'


export const Container = styled.div`
    display: flex;
    height: 100vh;
`

export const SideBar = styled.div`
    width: 25%;
    display: flex;
    background-color: #efe8e3;
    flex-direction: column;
    border-right: 1px solid ${shade(0.1, '#efe8e3')};
`

export const SideBarHeader = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
`

export const TitleSideBarHeader = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 19px;
    letter-spacing: 1px;
    font-weight: 500;
`

export const ContentSideBarHeader = styled.div`
    display: flex;

    div{
        margin-left: 5px;
        padding: 6px;
        display: flex;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;

        &:hover{
            background-color: ${lighten(0.1,  '#efe8e3')};
        }
    }
`



export const SearchContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: center;
   
`

export const SearchContent = styled.div`
    display: flex;
    background-color: #fff;
    align-self: center;
    padding: 0px 15px;
    align-items: center;
    border-radius: 15px;
    width: 90%;
    height: 30px;
`

export const SearchInput = styled.input`
    border: none;
    margin-left: 10px;
    flex: 1;
    font-size: 14px;
    outline: none;
    background-color: transparent;
`

export const ChatItemContainer = styled.div`
    margin-top: 20px;
    background-color: white;
    flex: 1;
    overflow-y: auto;
    background-color: #efe8e3;

    &::-webkit-scrollbar{
        width: 5px;
        height: 5px;
        
    }

    &::-webkit-scrollbar-thumb{
        background-color: #58c434;
    }
`


