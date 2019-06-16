import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
  width: 60%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  margin-right: 5px;
  border-radius: 5px;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
`;

const Room = styled.div`
  min-width: 100px;
  max-width: 130px;
  height: 100px;
  background-color: #6494F3;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  
  :hover {
    background-color: #24A7FF; 
    transition-duration: .5s;
  }
`;

const RoomTitle = styled.h3`
  font-weight: bold;
  text-align: center;
`;

const RoomDescription = styled.div`
  margin: 5px 0;
`;

export default function RoomList(props) {
  const rooms = props.rooms;
  const list = rooms.map(room => {
    const type = room.type == 'public' ?
      <p><FontAwesomeIcon icon={faUnlock} /> Público</p> : 
      <p><FontAwesomeIcon icon={faLock} /> Privado</p>
    return (
      <Room key={`room-${room.id}`} onClick={() => props.onRoomClick(room.id)}>
        <RoomTitle>{room.name}</RoomTitle>
        <hr/>
        <RoomDescription>
          { type }
          <p><FontAwesomeIcon icon={faUser} /> {room.users.length} jogadores</p>
        </RoomDescription>
      </Room>
    )
  })

  return (
    <Container>
      { list }
    </Container>
  )
}