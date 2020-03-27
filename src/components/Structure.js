import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';


const Container = styled.div `
    width: 100%;
    height: 100%;
    background-color: #1C1C1C;
    text-align: center;
    color: white !important;
    padding-top: 30px;
    padding-bottom: 30px;
    `

const Structure = props => {
  return (
      <div>
        <Header/>
            <Container>
              {props.children}
            </Container>
        <Footer/>
      </div>
  )
}


export default Structure;
