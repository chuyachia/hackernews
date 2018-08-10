import React from "react";
import styled from 'styled-components';


const Foot=styled.div`
    text-align:center;
    & > a {
        color: inherit;
        text-decoration: underline dashed;
        text-underline-position: under;
    }
`


class Footer extends React.Component {
    render(){
        return (<Foot>Made by <a href="https://github.com/chuyachia" target="_blank">Chu-Ya Chia</a></Foot>);
    }
}


export default Footer;