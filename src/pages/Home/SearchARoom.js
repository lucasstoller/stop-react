import React from 'react';

import RoomList from './RoomList';
import RoomDetails from './RoomDetails';
import Loading from '../../components/Loading'
import api from '../../services/api';

const divStyle = {
	width: '75%',
	height: '60%',
	background: 'rgba(135, 145, 164, 0)',
	color: 'white',
	top: '50%', 'left':'50%',
	position: 'absolute',
	transform: 'translate(-50%, -50%)',
	padding: '10px',
	borderRadius: '5px',
	display: 'flex'
}

export default class SearchARoom extends React.Component {
	constructor(props){
    super(props);

    this.state = {
			rooms: [],
			room: null,
			isLoading: true
		}

		this.handleRoomClick = this.handleRoomClick.bind(this);
	}

	async componentDidMount(){
		const response = await api.get('/rooms')
		
		const rooms = response.data
		const room = rooms[0] ? rooms[0] : null 

		this.setState({ rooms, room, isLoading: false });
	}

	handleRoomClick(roomId){
		const room = this.state.rooms.find(room => room.id == roomId);
		this.setState({room});
	}

	render(){
		let content 

		if (this.state.isLoading) {
			content = (
				<div style={divStyle}>
					<Loading message='Buscando salas...' background=''/>
				</div>
			)
		} else {
			content = (
				<div style={divStyle}>
					<RoomList rooms={this.state.rooms} onRoomClick={this.handleRoomClick} />
					<RoomDetails room={this.state.room} onEnterRoom={this.props.onEnterRoom}/>
				</div>
			)
		}
		return content
	}
}