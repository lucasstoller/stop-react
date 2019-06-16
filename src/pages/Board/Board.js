import React from 'react';
import styled from 'styled-components';
import bgImage from '../../assets/board-bg.png';
import GameStatus from './GameStatus';
import GameInput from './GameInput';

const Game = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${bgImage});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export default class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <Game>
        <GameStatus />
        <GameInput />
      </Game>
    )
  }
}