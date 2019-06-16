import React, {Fragment} from 'react';
import { getToken } from '../../services/auth';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import Menu from '../../components/Menu';
import Showcase from './Showcase';
import Room from '../Room/Room';

class Home extends React.Component{
  constructor({ props }){
    super(props);

    this.state = {
      user: null,
      room: null,
    }

    this.handleEnterRoom = this.handleEnterRoom.bind(this);
  }

  async componentWillMount(){
    const token = getToken()
    const { uid } = jwt_decode(token);
    const response = await api.get(`/users/${uid}`);
    this.setState({ user: response.data })
  }

  handleEnterRoom(room){
    this.setState({ room })
  }

  render() {
    const { room, user } = this.state
    const content = room ? 
      <Room 
        style="height: 80vh"
        room={ room }
        user={ user } /> :
      <Showcase 
        style="height: 80vh" 
        user={ user }
        onEnterRoom={ this.handleEnterRoom } />
    
    return (
      <Fragment>
        <Menu style="height: 20vh" />
        { content }
      </Fragment>
    )
  }
}

export default Home;