import React from 'react';
import styled from 'styled-components';
import Options from './Options';

const Container = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 3vw;
`;
const Answers = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 3vw;
`;
const Answer = styled.div`
  width: 100%;
`;
const Input = styled.input`
  border-radius: 5px;
  width: 100%;
  height: 3vw;
`;
const Label = styled.label`
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
`;

export default class GameInput extends React.Component{
  render(){
    return (
      <Container>
        <Answers>
          <Answer>
            <Label>ESPORTES </Label>
            <Input />
          </Answer>
          <Answer>
            <Label>CARROS </Label>
            <Input />
          </Answer> 
          <Answer>
            <Label>FRUTAS </Label>
            <Input />
          </Answer> 
          <Answer>
            <Label>POKEMON </Label>
            <Input />
          </Answer>  
        </Answers>
        <Options />
      </Container>
    )
  }
}