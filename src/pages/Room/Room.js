import React, {Fragment} from 'react';
import styled from 'styled-components';
import Menu from '../../components/Menu';
import RoomAuth from './RoomAuth';
import RoomDetails from './RoomDetails';
import Ws from '@adonisjs/websocket-client'

let ws = null

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
      type: 'public', 
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
 
  async handleQuitRoom(){
    await ws.close()
    window.location.pathname = '/home'
  }

  handleStartGame(){
    const roomChannel = ws.getSubscription('room')
    if(roomChannel) roomChannel.emit('startMatch', 'bla')
    else console.error('Canal não existe');
  }

  startRoomWS () {
    ws = Ws('ws://localhost:3333').connect()
  
    ws.on('open', () => {
      console.log('Conexão aberta!');
      this.subscribeToChannel()
    })
  
    ws.on('error', () => {
      console.error('Erro na conexão usando WS.');
    })
  }

  subscribeToChannel(){
    const room = ws.subscribe('room');
  
    room.on('error', () => {
      console.error('Não foi possível se inscrever no canal.');
    })
  
    room.on('matchStarted', () => {
      alert('Vamos começar a partida!');
      window.location = `/partida.html?partidaId=${this.state.roomId}&usuario=User`
    })
  }

  render(){
    let content = null;

    if(this.state.hasAccess) {
      content = <RoomDetails 
                  room={this.state.room} 
                  onClickQuitRoom={this.handleQuitRoom}
                  onClickStartGame={this.handleStartGame} />
      this.startRoomWS()
    } else{
      content = <RoomAuth 
                  password={this.state.room.password} 
                  onAuthenticated={this.handleHadAccess}/>
    }

    return (
      <Fragment>
        <Menu style="height: 20vh"></Menu>
        <Container>{content}</Container>
      </Fragment>
    )
  }
}