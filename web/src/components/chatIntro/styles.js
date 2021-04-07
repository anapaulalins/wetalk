import styled from 'styled-components'

export const Container = styled.div`
    background-color:#efe8e3;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const IconImage = styled.img`
    margin-top: -80px;
    width: 350px;
    height: 350px;
`


export const Title = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 30px;
`
export const ButtonsLink = styled.div`
    display: flex;
    margin-top: 20px;
    width: 450px;
    justify-content: space-between;
`


export const AppLink = styled.button`
    background-color: #58c434;
    display: flex;
    align-items: center;
    padding: 4px 25px;
    border: none;
    border-radius: 10px;
`

export const TextButtonLink = styled.p`
    color:  #efe8e3;
    font-family: 'Bree Serif', serif;
    font-size: 14px;
    width: 120px;
`

export const TextButtonStrong = styled.strong`
   font-weight: bold;
   letter-spacing: 1px;
   font-size: 17px
`