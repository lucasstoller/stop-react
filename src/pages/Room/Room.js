import React, { Fragment } from 'react';
import styled from 'styled-components';
import { getToken } from '../../services/auth';
import jwt_decode from 'jwt-decode';
import Menu from '../../components/Menu';
import RoomAuth from './RoomAuth';
import RoomDetails from './RoomDetails';
import Loading from '../../components/Loading';
import Ws from '@adonisjs/websocket-client';
import api from '../../services/api';
import { logout } from '../../services/auth';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

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
  constructor({ props, match }){
    super(props)
    
    this.state = {
      id: match.params.id,
      user: null,
      room: null,
      hasAccess: null, 
      isLoading: true,
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleEnterRoom = this.handleEnterRoom.bind(this)
    this.handleQuitRoom = this.handleQuitRoom.bind(this)
    this.handleStartGame = this.handleStartGame.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  
  async componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)

    const token = getToken()
    const { uid } = jwt_decode(token)
    const { data: user } = await api.get(`/users/${uid}`)
    const { data: room } = await api.get(`/rooms/${this.state.id}`)
    const hasAccess = room.type == 'public' ? true : false
    
    await this.setState({ user, room, hasAccess, isLoading: false })
    if(hasAccess) this.handleEnterRoom()
  }

  onUnload = e => {
    this.handleQuitRoom()
  }
  
  handleAuth() {
    this.setState({ hasAccess: true })
    this.handleEnterRoom()
  }

  async handleEnterRoom(){
    const msg = 'Infelizmente não foi possível entrar na sala. Tente novamente em instantes.'
    const { user: {id: user_id}, room: {id: room_id} } = this.state   

    try {
      await api.post(`/users/${user_id}/rooms/${room_id}`)
      this.startRoomWS()
    } catch (error) {
      console.error(error)      
      Alert.error(msg, {position: 'top', effect: 'scale', beef: false, timeout: 3000, offset: -1});      
      this.props.history.pop()
    }
  }

  async handleQuitRoom(){
    const msg = 'Algum erro ocorreu e não foi possível sair da sala. Tente novamente.';
    const { user: {id: user_id}, room: {id: room_id} } = this.state    

    const response = await api.delete(`/users/${user_id}/rooms/${room_id}`)
    
    if (response.status == 200) {
      ws.close()
    } else {
      Alert.error(msg, {position: 'top', effect: 'scale', beef: false, timeout: 3000, offset: -1});      
    }
   }

  handleLogout(){
    this.handleQuitRoom()
    logout()
  }

  handleStartGame(){
    const { id: roomID } = this.state.room
    const roomChannel = ws.getSubscription(`room:${roomID}`)
    if(roomChannel) roomChannel.emit('startMatch', { roomID })
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
      ws.close()
    })
  }

  subscribeToChannel(){    
    const { room, user } = this.state
    const payload = {
      username: user.username,
      room: room.id
    }
    
    const roomSubscription = ws.getSubscription(`room:${room.id}`) || ws.subscribe(`room:${room.id}`)
    
    roomSubscription.emit('hello', payload)
    
    roomSubscription.on('error', () => {
      Alert.error('A sala está com algum erro, tente novamente', {position: 'top', effect: 'scale', beef: false, timeout: 3000, offset: -1});      
      ws.close()
    })
  
    roomSubscription.on('matchStarted', () => {
      Alert.success('Tudo certo, vamos começar a partida!', {position: 'top-left', effect: 'scale', beef: false, timeout: 1500, offset: -1});      
      this.props.history.push(`/room/${this.state.room.id}/board`)
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
      this.props.history.push('/home')
    })
  }

  handleClick = () => {
    const effects_array = ['bouncyflip','slide','jelly'];
    const htmlMsg = '<h2 style="font-size: 30px; font-family: Brush Script MT; padding-left:45%">Coming Soon!</h2>';
    const randomNum = Math.floor(Math.random() * 3);
    Alert.info(htmlMsg, {position: 'top', effect: effects_array[randomNum], beef: false, html: true, timeout: 1250, offset: -1});
  }

  render(){
    const { room, hasAccess, isLoading } = this.state
    let content

    if (isLoading) {
      content = <Loading message='Carregando sala...' background='rgba(0, 0, 0, 0.7)'/>
    }
    else if(hasAccess) {
      content = <RoomDetails
                  room={room} 
                  onClickQuitRoom={() => this.handleQuitRoom()}
                  onClickStartGame={() => this.handleStartGame()} />
    } else {
      content = <RoomAuth 
                  password={room.password} 
                  onAuthenticated={() => this.handleAuth()}/>
    }

    return (
      <Fragment>        
        <Alert/>
        <Menu style="height: 20vh" onLogout={ this.handleLogout }
        Click={this.handleClick}/>
        <Container>{content}</Container>
      </Fragment>
    )
  }
}