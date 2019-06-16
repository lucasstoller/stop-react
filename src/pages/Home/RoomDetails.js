import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  width: 40%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  border-radius: 5px;
  color: #6D6D6D;
  display: flex;
  flex-direction: column;
`;

const RoomTitle = styled.h1`
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

const RoomDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.div`
`;

const RoomPassword = styled.input`
`;

const Button = styled.button`
  background-color: #F1870F;
  font-weight: bold;
  color: #fff;
  padding: 1vw 2vw;
  margin: auto;
  border-radius: 5px;
  cursor: pointer;
`;

class RoomDetails extends React.Component {
  render(){
    const room = this.props.room;
    let content
    
    if(room){
      const { themes, users: players, type } = room;
      content = (
        <Container>
          <RoomTitle>{room.name}</RoomTitle>
          <RoomDescription>
            <Item>Temas: {themes.join(', ')}</Item>
            <Item>Tipo: {type == 'private'?'Privada':'Pública'}</Item>
            <Item>Jogadores na sala: {players.join(', ')}</Item>
          </RoomDescription>
          <Button onClick={() => this.props.onEnterRoom(room)}>Entrar</Button>
        </Container>
      )
    } else content = <Container />
    
    return content
  }
}

export default RoomDetails;