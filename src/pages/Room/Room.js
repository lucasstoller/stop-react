import React from 'react';
import styled from 'styled-components';
import RoomAuth from './RoomAuth';
import RoomDetails from './RoomDetails';
import Ws from '@adonisjs/websocket-client';
import api from '../../services/api';

let ws

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
  constructor({ props }){
    super(props)

    this.state = {
      room: null,
      hasAccess: null
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleEnterRoom = this.handleEnterRoom.bind(this);
    this.handleQuitRoom = this.handleQuitRoom.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
  }

  async componentWillMount(){
    const { room } = this.props
    const hasAccess = room.type == 'public' ? true : false
    
    await this.setState({ room, hasAccess })
    
    if(this.state.hasAccess) this.handleEnterRoom()
  }
  
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
  }

  onUnload = e => {
    this.handleQuitRoom()
  }
  
  handleAuth() {
    this.setState({ hasAccess: true })
    this.handleEnterRoom()
  }

  async handleEnterRoom(){
    const { user: {id: user_id} } = this.props    
    const { room: {id: room_id} } = this.state
    try {
      await api.post(`/users/${user_id}/rooms/${room_id}`)
      this.startRoomWS()
    } catch (error) {
      console.error(error)
      alert('Infelizmente não foi possível entrar na sala. Tente novamente em instantes.')
      window.location.pathname = '/home' 
    }
  }

  async handleQuitRoom(){
    const { user: {id: user_id} } = this.props    
    const { room: {id: room_id} } = this.state

    const response = await api.delete(`/users/${user_id}/rooms/${room_id}`)
    
    if (response.status == 200) {
      ws.close()
    } else {
      alert('Algum erro ocorreu e não foi possível sair da sala. Tente novamente.')
    }
  }

  handleStartGame(){
    const roomChannel = ws.getSubscription(`room:${this.state.room.id}`)
    if(roomChannel) roomChannel.emit('startMatch', 'bla')
    else console.error('Canal não existe'); 
  }

  startRoomWS () {
    ws = Ws('ws://localhost:3333').connect()
  
    ws.on('open', () => {
      console.log('Conexão com o servidor aberta!');
      this.subscribeToChannel()
    })
  
    ws.on('error', () => {
      console.error('Erro na conexão usando WS.');
    })
  }

  subscribeToChannel(){
    const { room } = this.state
    const { user } = this.props
    const payload = {
      username: user.username,
      room: room.id
    }
    const roomSubscription = ws.getSubscription(`room:${room.id}`) || ws.subscribe(`room:${room.id}`)
    roomSubscription.emit('hello', payload)
    
    roomSubscription.on('error', () => {
      alert('A sala está com algum erro, tente novamente');
    })
  
    roomSubscription.on('matchStarted', () => {
      alert('Vamos começar a partida!');
      window.location = `/partida.html?partidaId=${room.id}&usuario=${user.username}`
    })

    roomSubscription.on('newMemberEntered', user => {
      this.setState(state => {
        return {
          room: {
            users: state.room.users.push(user), 
            ...state.room
          }
        }
      })
      console.log(`${user} entrou na sala`);
    })

    roomSubscription.on('memberExited', payload => {
      console.log(payload);
      
      this.setState(state => {
        return {
          room: {
            ...state.room,
            users: state.room.users.filter(user => user != payload.username)
          }
        }
      })
      console.log(`${payload.username} saiu da sala`);
    })

    roomSubscription.on('close', () => {
      window.location.pathname = '/home'
    })
  }

  render(){
    let content
    
    if(this.state.hasAccess) {
      content = <RoomDetails
                  room={this.state.room} 
                  onClickQuitRoom={this.handleQuitRoom}
                  onClickStartGame={this.handleStartGame} />
    } else {
      content = <RoomAuth 
                  password={this.state.room.password} 
                  onAuthenticated={this.handleAuth}/>
    }

    return (
      <Container>{content}</Container>
    )
  }
}