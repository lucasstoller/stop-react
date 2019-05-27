import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  margin-left: 5px;
  border-radius: 5px;
  color: #6D6D6D;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Title = styled.h2`
  font-weight: bold;
  text-align: center;
  padding: 10px;
`;

export default function RoomDetails(props) {
  return (
    <Container>
      <Title>Status</Title>
    </Container>
  )
}