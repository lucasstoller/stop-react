import React, {Fragment} from 'react';
import { getToken } from '../../services/auth';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { logout } from '../../services/auth';
import Showcase from './Showcase';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class Home extends React.Component{
  constructor({ props }){
    super(props);

    this.state = {
      user: null,
      room: null,
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleEnterRoom = this.handleEnterRoom.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(){
    const effects_array = ['bouncyflip','slide','jelly'];
    const htmlMsg = '<h2 style="font-size: 30px; font-family: Brush Script MT; padding-left:45%">Coming Soon!</h2>';
    const randomNum = Math.floor(Math.random() * 3);
    Alert.info(htmlMsg, {position: 'top', effect: effects_array[randomNum], beef: false, html: true, timeout: 1250, offset: -1});    
  }

  render() {
    const { user } = this.state
    return (
      <Fragment>
        <Alert />
        <Menu 
          style="height: 20vh"
          onLogout={ this.handleLogout }
          Click={this.handleClick}     
        />    
        <Showcase 
          style="height: 80vh" 
          user={ user }
          onEnterRoom={ this.handleEnterRoom } />
      </Fragment>
    )
  }
}

export default Home;
