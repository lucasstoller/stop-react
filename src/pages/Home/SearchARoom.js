import React from 'react';

import RoomList from './RoomList';
import RoomDetails from './RoomDetails';

const divStyle = {
	'width': '75%',
	'height': '60%',
	'background': 'rgba(135, 145, 164, 0)',
	'color': 'white',
	'top': '50%', 'left':'50%',
	'position': 'absolute',
	'transform': 'translate(-50%, -50%)',
	'padding': '10px',
	'border-radius': '5px',
	'display': 'flex',
}

export default class SearchARoom extends React.Component {
	constructor(props){
    super(props);

    this.state = {
			room: '',
			rooms: [],
			loadingRooms: false
		}

		this.handleRoomClick = this.handleRoomClick.bind(this);
	}

	componentWillMount(){
		// Aqui que vamos conectar com o banco para pegar as salas
		console.log('Component will Mount: Apague-me quando estiver pronto!');
		// Por enquanto vamos usar umas salas fake.
		const themes = ['Esportes', 'Frutas', 'Carros', 'Pokemon']
		const rooms = [
			{ id: 1, name: 'Amigos do Zeca', type: 'public', players_count: 1, themes, round: 3},
			{ id: 2, name: 'Amigos do Stoller', type: 'private', players_count: 2, themes, round: 1 },
			{ id: 3, name: 'Amigos do Vinicio', type: 'public', players_count: 4, themes, round: 2 },
			{ id: 4, name: 'Amigos do Pedrao', type: 'private', players_count: 1, themes, round: 1 },
			{ id: 5, name: 'Amigos do Celin', type: 'public', players_count: 3, themes, round: 1 },
			{ id: 6, name: 'Amigos do Brunao', type: 'private', players_count: 2, themes, round: 3 },			
			{ id: 7, name: 'Amigos do Hassan', type: 'public', players_count: 2, themes, round: 2 },			
			{ id: 8, name: 'Amigos do Samir', type: 'private', players_count: 4, themes, round: 2 },			
			{ id: 9, name: 'Amigos do Gustavo', type: 'public', players_count: 3, themes, round: 1 },			
		]

		this.setState({rooms, room: rooms[0]});
	}

	handleRoomClick(roomId){
		// Aqui nos vamos nos conectar com o banco e fazer um get na sala atraves do ID
		// Porém, por enquanto vamos apenas usar umas das rooms cadastradas
		const room = this.state.rooms.find(room => room.id == roomId);
		this.setState({room});
	}

	render(){
		return (
			<div style={divStyle}>
				<RoomList rooms={this.state.rooms} onRoomClick={this.handleRoomClick} />
				<RoomDetails room={this.state.room}/>
			</div>
		)
	}
}