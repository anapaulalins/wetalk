import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
    width: 25%;
    background-color: #fdfdfd;
    position: fixed;
    top: 0;
    bottom: 0;   
    border-right: 1px solid ${shade(0.1, '#efe8e3')};
    display: flex;
    flex-direction: column;
    transition: all ease 0.5s; 
    z-index: 1;
`

export const Header = styled.div`
    display: flex;
    align-items: center;
    padding: 90px 15px 15px 15px;
`

export const Title = styled.p`
    font-size: 21px;
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    margin-left: 10px;
    letter-spacing: 1.5px;
    margin-left: 30px;
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`

export const ContentInput = styled.div`
    display: flex;
    margin-top: 25px;
    width: 250px;
    position: relative;
`

export const InputContact = styled.input`
    border: none;
    background-color: transparent;
    outline: none;
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 14px;
    flex: 1;
`

export const SelectRegion = styled.select`
    flex: 1;
    border: none;
    color: #58c434;
    font-family: 'Bree Serif', serif;
    background-color: #fdfdfd;
`
export const OptionRegion = styled.option`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
`

export const Label = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 16px;
    margin-right: 20px;
`

export const Button = styled.button`
    width: 250px;
    margin-top: 30px;
    border: none;
    background-color: transparent;
    background-color: #58c434;
    padding: 5px;
    border-radius: 6px;
    color: #fdfdfd;
    font-family: 'Bree Serif', serif;
`

export const Info = styled.div`
    width: 120px;
    background-color: #58c434;
    position: absolute;
    height: 30px;
    border-radius: 15px;
    right: -35px;
    top: -45px;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after{
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 15px solid #58c434;
        bottom: -13px;
        left: 55%;
       
    }

    p{
        font-size: 13px;
        color: #fdfdfd;
        font-family: 'Bree Serif', serif;
    }
    

`
export const Optional = styled.p`
    color: #58c434;
    font-family: 'Bree Serif', serif;
    font-size: 13px;
    position: absolute;
    right: 0;
    top: 0;
`
  
  