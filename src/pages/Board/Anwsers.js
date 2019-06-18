import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0 3vw;
  height: 28em;
  
`;
const Answer = styled.div`
  width: 100%;
`;
const Input = styled.input`
  border-radius: 5px;
  width: 50%;
  height: 3vw;
  font-family: cursive;
  font-size: 26px;
`;
const Label = styled.label`
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  font-size: 20px;
  font-family: cursive
`;

export default function Answers(props){
  const { themes } = props
  
  const answers = themes.map((theme, index )=> {
    return (
      <Answer key={`theme-${index}`}>
        <Label>{theme.name}</Label>
        <div>
          <Input value={theme.word} onChange={(e) => props.onChangeWord(index, e.target.value)}/>
        </div>
      </Answer>
    )
  })
  
  return (
    <Container style={{marginLeft: '8em', marginTop: '3em'}}>
      { answers }
    </Container>    
  )
}