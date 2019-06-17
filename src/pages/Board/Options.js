import React from 'react';
import styled from 'styled-components';
import stopBg from '../../assets/stop-bg.png';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const Container = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Stop = styled.div`
  width: 100%;
  background-image: url(${stopBg});
  background-position: center;  
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;

`;
const Exit = styled.button`
  background-color: #ff0000;
  color: #fff;
  text-align: center;
  padding: 1vw;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  cursor: pointer;
`;
export default function Options(){
  return (
    <Container>
      <Stop  onClick={() => onStop()}/>
      <Exit>SAIR</Exit>
    </Container>
  )
}

function onStop(){

  Alert.info('Alguém apertou stop!', {position: 'top-left', effect: 'scale', beef: false, timeout: 1500, offset: -1});
}