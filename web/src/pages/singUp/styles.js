import styled from 'styled-components'

import CoupleWeChat from '../../images/couple-wechat.jpg'

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
`
export const ContentDivs = styled.div`
    position: relative;
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


export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
    margin-top: 120px;
`
export const ContainerDiv = styled.div`
    display: flex;
    margin-top: 20px;
    width: 250px;
    position: relative;
`

export const Background = styled.div`
    flex: 1;
    background: url(${CoupleWeChat}) no-repeat center;
    background-size: cover;
`
export const Label = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 16px;
    margin-right: 20px;
`

export const SelectRegion = styled.select`
    width: 200px;
    border: none;
    color: #58c434;
    font-family: 'Bree Serif', serif;
    background-color: #fff;
`
export const Input = styled.input`
    width: 150px;
    border: none;
    background-color: #ffff;
    color: #2a2a2e;
    padding: 5px;
    font-size: 14px;
`

export const InputFile = styled.input`
    background-color: red;
    /* width: 40px;
    height: 40px; */
    position: absolute;
    right: -20px;
    top: 0;
`

export const OptionRegion = styled.option`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
`

export const Title = styled.h2`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    margin-bottom: 10px;
`

export const ButtonClose = styled.button`
    position: absolute;
    right: 30px;
    top: 30px;
    background: none;
    border: none;
`
export const Button = styled.button`
    margin-top: 20px;
    border: none;
    padding: 10px;
    width: 70%;
    align-self: center;
    border-radius: 5px;
   
`
export const TextButton = styled.p`
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    font-size: 16px;

`
export const TextVerify = styled.p`
    color: #596b91;
    font-family: 'Bree Serif', serif;
    letter-spacing: 1px;
    font-size: 14px;
`

export const ContainerVerify = styled.div`
    margin-top: 20px;
`


export const ContentAvatar = styled.div`
    position: absolute;
    top: 0;
    right: 0;

`

export const ContentImage = styled.div`
    width: 55px;
    height: 55px;
    background-color: #e5e4e2;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 55px;
  height: 55px;
  align-self: center;

  img {
    width: 55px;
    height: 55px;
    border-radius: 3px;
    
  }

  label {
    position: absolute;
    width:35px;
    height:35px;
    background: #58c434;
    border-radius: 50%;
    right: -15px;
    bottom: -15px;
    border: 0;
    transition: background 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width:20px;
      height:20px;
      color: #2a2a2e;
    }

    
  }
`;