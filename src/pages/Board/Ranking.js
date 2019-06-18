import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 30vw;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 5px;
  padding: 0 3vw;
  margin: 10px;
`;
const Player = styled.div`
  width: 100%;
`;
const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

export default function Ranking(props){  
  const { users } = props
  
  const players = users.map((player, index) => {
    return (
      <Player key={`player-${index}`}>
        <span>{ player.username }: { player.points=0 } pontos</span>
      </Player>
    )
  })

  return (
    <Container>
      <Title>Ranking</Title>
      { players }
    </Container>   
  )
}