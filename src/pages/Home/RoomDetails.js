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
  handleEnterRoom(id){
    window.location.pathname = '/room/' + id
  }

  render(){
    const room = this.props.room;
    let content
    
    if(room){
      const { themes, type } = room;
      content = (
        <Container>
          <RoomTitle>{room.name}</RoomTitle>
          <RoomDescription>
            <Item>Temas: {['Esportes', 'Carros', 'Frutas', 'Pokemon'].join(', ')}</Item>
            <Item>Privada / Pública: {type == 'private'?'Privada':'Pública'}</Item>
          </RoomDescription>
          <Button onClick={() => this.handleEnterRoom(room.id)}>Entrar</Button>
        </Container>
      )
    } else content = <Container />
    
    return content
  }
}

export default RoomDetails;