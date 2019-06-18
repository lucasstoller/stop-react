import React from 'react';
import styled from 'styled-components';
import roundBg from '../../assets/round-bg.png';
import letterBg from '../../assets/letter-bg.png';



const Container = styled.div`
  height: 30vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Rodada = styled.div`
  font-family: cursive;
  width: 30vw;
  height: 15vw;  
  background-position: center;  
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  font-size: 3vw;
  font-weight: bold;
  color: #000;
  margin-top: 10px;
  
  padding-right: 0px;
`;

const Letra = styled.div`
  font-family: cursive;
  width: 30vw;
  height: 15vw;  
  background-position: center;  
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  font-size: 3vw;
  font-weight: bold;
  color: #000;
  margin-top: 10px;
  margin-right: 7em;
`;


export default function GameStatus(props){
  return (
    <Container>
      <Rodada style={{backgroundImage: `url(${roundBg})`}}>Rodada: {props.round} </Rodada>
      <Letra style={{backgroundImage: `url(${letterBg})`}}>Letra: {props.letter} </Letra>
    </Container>
  )
}