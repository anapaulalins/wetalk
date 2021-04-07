import styled from 'styled-components'

import WeChatWomen from '../../images/wechat-women.jpg'

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
    margin-top: 120px;
`

export const ContentDivs = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 68%;
    border-bottom: 1px solid #c3c3c3;
    padding-bottom: 25px;
`

export const Containerdivs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
`

export const Title = styled.h2`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    margin-bottom: 10px;
`

export const ContainerDiv = styled.div`
    display: flex;
    margin-top: 20px;
`

export const Label = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 16px;
    margin-right: 20px;
`

export const Input = styled.input`
    width: 200px;
    border: none;
    background-color: #ffff;
    color: #2a2a2e;
    padding: 5px;
    font-size: 14px;
   
`

export const SelectRegion = styled.select`
    width: 200px;
    border: none;
    color: #58c434;
    font-family: 'Bree Serif', serif;
    background-color: #fff;
`

export const OptionRegion = styled.option`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
`

export const Button = styled.button`
    margin-top: 20px;
    border: none;
    padding: 10px;
    width: 70%;
    align-self: center;
    border-radius: 5px;
   
`

export const TextVerify = styled.p`
    color: #596b91;
    color: #418650;
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    font-size: 14px;
`

export const ContainerVerify = styled.div`
    margin-top: 20px;
`


export const TextButton = styled.p`
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    font-size: 16px;

`

export const Background = styled.div`
    flex: 1;
    background: url(${WeChatWomen}) no-repeat center;
    background-size: cover;

`

export const ButtonClose = styled.button`
    position: absolute;
    left: 30px;
    top: 30px;
    background: none;
    border: none;
`