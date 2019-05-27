import React from 'react';
import styled from 'styled-components';
import Options from './Options';

import bgImage from '../assets/home-bg.png';
import CreateARoom from '../pages/Home/CreateARoom';
import SearchARoom from '../pages/Home/SearchARoom';

export const Container = styled.div`
  height: 92vh;
  background-image: url(${bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Content = styled.div`
  height: 80%;
`;

class Showcase extends React.Component {
  constructor(props){
    super(props);

    this.handleChangeOption = this.handleChangeOption.bind(this);
    this.state = { option: 'SearchARoom' }
  }

  handleChangeOption(option){
    this.setState({ option });
  }

  render() {
    const option = this.state.option;
    let content;

    switch(option){
      case 'CreateARoom':
        content = (
          <Content>
            <CreateARoom user={{user_id: 1}} />
          </Content>
        ) 
        break;
      case 'SearchARoom':
        content = (
          <Content>
            <SearchARoom></SearchARoom>
          </Content>
        ) 
        break;
      default:
        content = <Content />
    }

    return (
      <Container>
        { content }
        <Options option={this.state.option} onChangeOption={this.handleChangeOption}></Options>
      </Container>
    );
  }
}

export default Showcase;