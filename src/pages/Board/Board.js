import bgImage from '../../assets/board-bg.png';
import btnImage from '../../assets/stop-bg.png';

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

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

let ws, matchSubscription

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
  width: 11%;
  height: 18%;
  background-color: #ff0000;
  font-size: 30px;
  color: #fff;
  font-family: Brush Script MT;
  font-weight: bold;
  border-radius: 50%;
  border: 1px solid #000000;
  display: inline-block;
  cursor: pointer;
  &:hover {
    width: 12%;
    height: 19%;
    transition-duration: 0.3s;
  }
  
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
    this.handleStopPress = this.handleStopPress.bind(this)
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

    matchSubscription = ws.subscribe(`match:${roomID}`)

    matchSubscription.on('error', () => {
      Alert.error('Não foi possível se increver nesse canal', {position: 'top-left', effect: 'scale', beef: false, timeout: 2500, offset: -1});      
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

    matchSubscription.on('stop', payload => {
      let message
      if(payload.username === this.state.user.username){
        message = 'Calculando os pontos...'
      } else {
        message = `${payload.username} apertou stop! Aguarde enquanto calculamos o pontos...`
      }
      const loading = { status: true, message }
      this.setState({ loading })

      payload = {
        match: this.state.roomID,
        round: this.state.match.round,
        player: {
          id: this.state.user.id,
          username: this.state.user.username
        },
        points: this.state.match.players.find(player => {
          return player.username === this.state.user.username
        }),
        anwsers: this.state.match.themes.map(theme => {
          return { theme: theme.id, word: theme.word }   
        })
      }

      matchSubscription.emit('calcRoundPoints', payload)
    })

    matchSubscription.on('newRound', match => {
      const loading = { status: false, message: null }
      this.setState({ loading, match })
    })

    matchSubscription.on('endGame', match => {
      const players = match.players.sort(function (a, b) {
        if (a.points > b.points) {
          return 1;
        }
        if (a.points < b.points) {
          return -1;
        }
        return 0;
      })
      const winner = players[0]
      alert(`A partida acabou!! O ganhador foi ${winner.username} com ${winner.points}`)
      ws.close()
    })
  }

  handleStopPress() {
    const { themes } = this.state.match
    let missingWords = false
  
    themes.forEach(theme => {
      if(theme.word === ''){
        Alert.error(`Preencha o campo '${theme.name}'`, {position: 'top-left', effect: 'scale', beef: false, timeout: 2500, offset: -1});
        // alert(`Preencha o campo '${theme.name}'`)
        missingWords = true
      }
    });

    if(!missingWords) {
      matchSubscription.emit('stop', { username: this.state.user.username })
      const loading = { status: true, message: 'Você apertou stop. Aguarde' }
      this.setState({ loading })
    }
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
          {/* <Stop onClick={this.handleStopPress}>STOP</Stop> */}
        </Fragment>
      )
    }
    return (
      <Game>{content}

        <Stop style={{position: 'absolute', top: '19em', right: '18em'}} onClick={this.handleStopPress}>Gritar Stop!</Stop>
      
        <Alert stack={{limit: 4}}/>        

      </Game>
    )
  }
}