import React from 'react';
import styled from 'styled-components';



const FooterStyle = styled.div`
  width: 100%;
  height: 60px;
  border: none;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #333333;
`

const Footer = (props) => {
  return (
    <FooterStyle>
        Design par Fiora
    </FooterStyle>
    );
}



export default Footer;
