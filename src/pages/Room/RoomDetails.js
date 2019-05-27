import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width: 40%;
  height: 100%;
  background-color: rgba(100, 148, 243, 0.8);
  margin-left: 5px;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

const Info = styled.div`
`;

const Subtitle = styled.h3`
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

export const Options = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;  
  height: 51px;
`;

export const Option = styled.li`
  background-color: #8791A4;
  color: #fff;
  text-align: center;
  padding: 1vw;
  font-weight: bold;
  font-size: 15px;
  border-radius: 5px;
  border: 3px solid grey;
  cursor: pointer;
`;

export default function RoomDetails(props) {
  const room = props.room;
  const { players_count, themes, players, round } = room;
  
  const listStyle = {
    'display': 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-around',
    'flex-wrap': 'wrap',
    'padding': '1vw'
  }

  const themeList = (
    <ul style={listStyle}>
      {themes.map(theme => (
        <li>{ theme }</li>
      ))}   
    </ul>
  )
  const playersList = (
    <ul style={listStyle}>
      {players.map(player => (
        <li>{ player.username }</li>
      ))}   
    </ul>
  )

  return (
    <Container>
      <Title>{room.name}</Title>
      <Info>
        <Subtitle>Online {players_count}/4</Subtitle>
        { playersList }
      </Info>
      <Info>
        <Subtitle>Temas</Subtitle>
        { themeList }
      </Info>
      <Options>
        <Option 
          onClick={() => props.onClickQuitRoom()}
          style={{backgroundColor: '#FF0000', borderColor: '#B41919'}}>Sair da sala</Option>
        <Option 
          onClick={() => props.handleStartGame()}
          style={{backgroundColor: '#04EC04', borderColor: '#087E14'}}>Hora do show!</Option>
      </Options>
    </Container>
  )
}