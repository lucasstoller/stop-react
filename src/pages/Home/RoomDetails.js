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

export default class RoomDetails extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      roomPassword: ''
    }
  }

  onPasswordChange(new_password){
    this.setState({roomPassword: new_password})
  }

  handleEnterRoom(){
    const { room } = this.props;
    const { roomPassword } = this.state;
    
    if (room.type == 'private' && !roomPassword) {
      return alert('Esta sala é protegida. Insira a senha para poder entrar.')
    }

    // Aqui vamos, mandar para o back, e dependendo da reposta
    // Ou redirecionar o jogador para a tela da sala. Ou mostrar o erro.

    alert('Vamos entrar na sala!');
  }

  render(){
    const room = this.props.room;
    const { players_count, themes, round, type } = room;
    
    return (
      <Container>
        <RoomTitle>{room.name}</RoomTitle>
        <RoomDescription>
          <Item>Jogadores: {players_count}/4</Item>
          <Item>Temas: {themes.join(', ')}</Item>
          <Item>Rodada {round}/3</Item>
          <Item>Privada / Pública: {type == 'private'?'Privada':'Pública'}</Item>
          { room.type == 'private' && 
            <Item>
              Senha: <RoomPassword
                        type="password" 
                        placeholder="Digite a senha para poder entrar"
                        onChange={e => this.onPasswordChange(e.target.value)}
                      />
            </Item>
          }
        </RoomDescription>
        <Button onClick={() => this.handleEnterRoom()}>Entrar</Button>
      </Container>
    )
  }
}