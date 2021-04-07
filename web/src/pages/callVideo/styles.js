import styled from 'styled-components'

export const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background-color: #000000;
    width: 75%;
    z-index: 1;
`

export const Content = styled.div`
    background-color: #fdfdfd;
    width: 100%;
`


export const TextContent = styled.p`
    color: #58c434;
    font-family: 'Bree Serif', serif;
    font-size: 30px;
    margin-top: 50px;
    margin-left: 50px;

`

export const Close = styled.div`
    position: fixed;
    right: 30px;
    top: 30px;
    background-color: #FF4500;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

`