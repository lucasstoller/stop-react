import bgImage from '../../assets/board-bg.png';

import React, { Fragment } from 'react';
import styled from 'styled-components';
import Status from './Status';
import Anwsers from './Anwsers';
import Ranking from './Ranking';
import Loading from '../../components/Loading';

import { getToken } from '../../services/auth';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import Ws from '@adonisjs/websocket-client';

let ws

const Game = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100vw;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Stop = styled.button`
  width: 80%;
  height: 10%;
  background-color: #054EE1;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2C2E63;
  }
  margin-bottom: 20px;
`;

export default class Board extends React.Component {
  constructor({ props, match}){
    super(props);

    this.state = {
      roomID: match.params.id,
      user: {},
      match: {},
      loading: { status: true, message: 'Carregando partida...' },
    }

    this.handleOnChangeWord = this.handleOnChangeWord.bind(this)
  }

  async componentDidMount(){
    const token = getToken()
    const { uid } = jwt_decode(token)
    const { data: user } = await api.get(`/users/${uid}`)
    const { data: match } = await api.get(`/rooms/${this.state.roomID}/match`)

    this.setState({ user, match })
    this.startMatchWS()
  }

  startMatchWS() {
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
    const { roomID } = this.state

    const matchSubscription = ws.subscribe(`match:${roomID}`)

    matchSubscription.on('error', () => {
      alert('Não foi possível se increver nesse canal')
      ws.close()
    })

    matchSubscription.on('close', () => {
      this.props.history.push('/home')
    })

    matchSubscription.on('ready', () => {
      console.log('Inscrição bem sucedida sucesso')
      const loading = { status: false, message: null }
      this.setState({ loading })
    })
  }

  handleStopPress(){
    alert('Voce apertou stop')
  }

  handleOnChangeWord(i, word){
    const themes = this.state.match.themes.map((theme, index) => {
      if(index === i) theme.word = word
      return theme
    })

    this.setState(state => {
      return {
        match: {
          themes, 
          ...state.match
        }
      }
    })
  }

  render(){
    const { loading, match } = this.state
    let content

    if (loading.status) {
      content = <Loading message={loading.message} background='rgba(0, 0, 0, 0.7)'/>
    }
    else {
      content = (
        <Fragment>
          <Status round={match.round} letter={match.letter} />
          <Container>
            <Anwsers themes={match.themes} onChangeWord={this.handleOnChangeWord} />
            <Ranking users={match.players} />
          </Container>
          <Stop onClick={this.handleStopPress}>STOP</Stop>
        </Fragment>
      )
    }
    return (
      <Game>{content}</Game>
    )
  }
}