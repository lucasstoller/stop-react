import React, {Fragment} from 'react';
import Menu from '../../components/Menu';
import Showcase from '../../components/Showcase';

function Home(){
  return (
    <Fragment>
      <Menu style="height: 20vh"></Menu>
      <Showcase style="height: 80vh"></Showcase>
    </Fragment>
  )
}

export default Home;