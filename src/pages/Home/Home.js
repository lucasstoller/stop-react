import React, {Fragment} from 'react';
import Menu from '../../components/Menu';
import Showcase from '../../components/Showcase';
import { getToken } from '../../services/auth';
import api from '../../services/api';
import jwt_decode from 'jwt-decode';

class Home extends React.Component{
  state = {
    user: null
  }

  async componentDidMount(){
    const token = getToken()
    const { uid } = jwt_decode(token);
    const response = await api.get(`/users/${uid}`);
    this.setState({ user: response.data })
  }

  render() {
    return (
      <Fragment>
        <Menu style="height: 20vh"></Menu>
        <Showcase style="height: 80vh"></Showcase>
      </Fragment>
    )
  }
}

export default Home;