import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`

    *, *:before, *:after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
        text-decoration: none;
        outline: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    html{
        @media(max-width: 720px){
            font-size: 87.5%
        }
        @media(max-width: 1080px){
            font-size: 93.75%
        }
    }

    body{
        background: #fdfdfd;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    body, input , button {
       font-family: 'Roboto Slab', serif;
       font-size: 16px;

    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    button {
        cursor: pointer;
    }

`
