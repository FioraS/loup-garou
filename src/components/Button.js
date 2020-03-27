import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  text-decoration: none;
  border:none;
  border-radius: 3px;
  cursor: pointer;
  padding: 8px 16px;
  margin: 15px;
  fontSize: 20;
  fontFamily: "Arial";
  
  color: #fff;
  background: #F65151;
  &:hover {
    background: #C73A3A ;
  }
  `

const Button1 = (props) => {
  const { onClick, children } = props;
  return (<button onClick={onClick}> { children }</button>);
}

export default Button;
