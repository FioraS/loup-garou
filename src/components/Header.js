import React from 'react';
import styled from 'styled-components';
import logo from './wolf.png';
import '../App.css';


const HeaderStyle = styled.div`
  width: 100%;
  height: 80px;
  border: none;
  font-size: 20px;
  display: flex;
   flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #333333;
`

const appLogo = styled.img`
    width: 50px;
`

const Header = (props) => {
  return (
    <HeaderStyle>
        <img src={logo} className="appLogo" alt="logo" /> <p>LOUP-GAROU</p>
  
    </HeaderStyle>
    );
}



export default Header;
