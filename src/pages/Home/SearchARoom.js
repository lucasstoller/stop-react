import React from 'react';

import RoomList from './RoomList';
import RoomDetails from './RoomDetails';
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
			loadingRooms: false
		}

		this.handleRoomClick = this.handleRoomClick.bind(this);
	}

	async componentWillMount(){
		const response = await api.get('/rooms')
		
		const rooms = response.data
		const room = rooms[0] ? rooms[0] : null 

		this.setState({ rooms, room });
	}

	handleRoomClick(roomId){
		const room = this.state.rooms.find(room => room.id == roomId);
		this.setState({room});
	}

	render(){
		return (
			<div style={divStyle}>
				<RoomList rooms={this.state.rooms} onRoomClick={this.handleRoomClick} />
				<RoomDetails room={this.state.room} onEnterRoom={this.props.onEnterRoom}/>
			</div>
		)
	}
}