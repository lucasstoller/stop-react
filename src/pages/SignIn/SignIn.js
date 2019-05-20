import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
`
const Input = styled.input`
  display: block;  
`

export default class Signin extends React.Component{
  constructor(props){
    super(props);

    this.state = { }
  }

  render(){
    return (

      <form>
        <Input type="email" placeholder="Insira seu email"></Input>
        <Input type="password" placeholder="Insira sua senha"></Input>
        <div>
          <Button>Entrar</Button>
          <p>ou</p>
          <a href="/signup">Criar conta</a>
        </div>
      </form>
    )
  }
}