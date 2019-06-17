import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
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

export default function Answers(props){
  const { themes } = props
  
  const answers = themes.map((theme, index )=> {
    return (
      <Answer key={`theme-${index}`}>
        <Label>{theme.name}</Label>
        <Input value={theme.word} onChange={(e) => props.onChangeWord(index, e.target.value)}/>
      </Answer>
    )
  })
  
  return (
    <Container>
      { answers }
    </Container>    
  )
}