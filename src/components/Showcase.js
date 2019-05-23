import React from 'react';
import styled from 'styled-components';
import Options from './Options';

import bgImage from '../assets/home-bg.png';

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

function Showcase(){
  return (
    <Container>
      <Content></Content>
      <Options></Options>
    </Container>
  );
}

export default Showcase;