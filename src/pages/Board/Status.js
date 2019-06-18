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

const Info = styled.div`
  width: 30vw;
  height: 15vw;
  background-position: center;  
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  font-size: 3vw;
  font-weight: bold;
  color: #000;
  padding: 15px;
  margin-top: 10px;
`;

export default function GameStatus(props){
  return (
    <Container>
      <Info style={{backgroundImage: `url(${roundBg})`}}>Rodada: {props.round} </Info>
      <Info style={{backgroundImage: `url(${letterBg})`}}>Letra: {props.letter} </Info>
    </Container>
  )
}