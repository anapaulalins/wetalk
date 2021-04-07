import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    background-color: #fff;
    flex: 1;
    cursor: pointer;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    z-index: 0;

    &:hover{
        background-color: #f2f2f2;
    }
`
export const Content = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 15px;
    flex-wrap: wrap;
    min-width: 0;
    
`
export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 20%;
`
export const ContentItem = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const NameItem = styled.p`
    color: #2a2a2e;
    font-family: 'Bree Serif', serif;
    font-size: 15px;
`

export const DateItem = styled.p`
    color: #999;
    font-family: 'Bree Serif', serif;
    font-size: 14px;
`

export const LastMgs = styled.div`
    color: #999;
    font-family: 'Bree Serif', serif;
    font-size: 14px;
    display: flex;
    width: 100%;
    margin-top: 3px;
`

export const Message = styled.p`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;
`

export const InCall = styled.div`
    position: absolute;
    right: 15px;
    top: 30px;
`