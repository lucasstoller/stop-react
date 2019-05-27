import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 75vw;
  height: 80vh;
  background: rgba(135, 145, 164, 0);
  color: #fff;
  top: 50%; left:50%;
 	position: absolute;
 	transform: translate(-50%, -50%);
 	padding: 10px;
 	border-radius: 5px;
`;

export default class RoomAuth extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      password: ''
    }
  }

  auth(){
    const {password} = this.state; 
    if (password == '') return alert('A senha não pode estar em branco!');
    
    if (password == this.props.password) return this.props.onAuthenticated();

    alert('Senha incorreta! Tente novamente.');
  }

  render(){ 
    return (
      <Container>
        <h1>Esta sala é privada. Para acessa-la digite a senha de acesso.</h1>
        <input 
          onChange={e => this.setState({password: e.target.value})}
          type="password" 
          placeholder="Senha"
        />  
        <button onClick={() => this.auth()}>OK</button>
      </Container>    
    )
  }
}



