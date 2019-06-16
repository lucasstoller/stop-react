import React, {Fragment} from 'react';
import { getToken } from '../../services/auth';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { logout } from '../../services/auth';
import Showcase from './Showcase';

class Home extends React.Component{
  constructor({ props }){
    super(props);

    this.state = {
      user: null,
      room: null,
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleEnterRoom = this.handleEnterRoom.bind(this)
  }

  async componentWillMount(){
    const token = getToken()
    const { uid } = jwt_decode(token);
    const response = await api.get(`/users/${uid}`)
    this.setState({ user: response.data })
  }
  
  handleLogout(){
    logout()
    this.props.history.push("/home")
  }

  handleEnterRoom(room){
    this.props.history.push(`/room/${room.id}`)
  }

  render() {
    const { user } = this.state

    return (
      <Fragment>
        <Menu 
          style="height: 20vh"
          onLogout={ this.handleLogout }/>
        <Showcase 
          style="height: 80vh" 
          user={ user }
          onEnterRoom={ this.handleEnterRoom } />
      </Fragment>
    )
  }
}

export default Home;