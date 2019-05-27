import React, {Fragment} from 'react';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import RoomAuth from './RoomAuth';
import RoomDetails from './RoomDetails';
import Status from './Status';

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
 	display: flex;
  justify-content: center;
`;

export default class Room extends React.Component{
  constructor({ props, match }){
    super(props);

    this.state = {
      roomId: match.params.id,
      room: {},
      hasAccess: '',
    }

    this.handleHadAccess = this.handleHadAccess.bind(this);
  }
  
  componentWillMount(){
    // Aqui vamos pegar nos comunicar coma api para obter o objeto sala 
    // Por enquanto vamos usar um fake

    const room = { 
      id: 1, 
      name: 'Amigos do Zeca', 
      type: 'private', 
      players_count: 1,
      players: [{username: 'stoller'}], 
      themes: ['Esportes', 'Frutas', 'Carros', 'Pokemon'],
      password: '123456789',
      round: 3
    }
    this.setState({
      room, 
      hasAccess: room.type == 'public' ? true : false
    });
  }

  handleHadAccess(){
    this.setState({hasAccess: true});
  }

  handleQuitRoom(){
    // Aqui vamos pegar nos comunicar com a api para desvincular o jogador da sala
    window.location.pathname = '/home'
  }

  // handleStartGame(){
  // }

  render(){
    let content = null;

    if(this.state.hasAccess) {
      content = (
        <Container>
          <RoomDetails room={this.state.room} onClickQuitRoom={this.handleQuitRoom} />
          <Status room={this.state.room} />
        </Container>
      )
    }else{
      content = <RoomAuth 
                  password={this.state.room.password} 
                  onAuthenticated={this.handleHadAccess}
                />
    }

    return (
      <Fragment>
        <Menu style="height: 20vh"></Menu>
        {content}
      </Fragment>
    )
  }
}