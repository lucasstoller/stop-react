import React from 'react';
import axios from 'axios';

const api = axios.create({
	baseURL: "http://cbfe40c6.ngrok.io",
});

const div_style = {
	width: '320px', height: '190', background: '#5D92EC',
	color: 'white', top: '50%', left:'50%', position: 'absolute',
	transform: 'translate(-50%, -50%)',
	padding: '70px 30px'}

const h1_style = {
	margin: '0', padding: '0 0 20px',
	'text-align': 'center', 'font-size': '22px'
}

const input = {
	width: '100%',
	'margin-bottom': '20px',
	border: 'none',
	'border-bottom': '1px solid #fff',
	height: '20px',
	'border-style': 'solid',
	'border-width': '1px'
}

const close = {
	'color': 'white',
  	'font': '14px/100% arial, sans-serif',
  	'position': 'absolute',
  	'right': '5px',
  	'text-decoration': 'none',
  	'text-shadow': '0 1px 0 #fff',
  	'top': '5px',
  	'content': '✖'
}

const button_style = {
	display: 'block',
	width: '50px',
	'margin-top': '5px'
}

export default class CreateARoom extends React.Component {
	constructor(props){
    super(props);

    this.state = {
			name: "",
			password: "",
			type: "public",
		}
  }

	async onSubmit(e){
		const path = '/api/rooms';

		const data = {
			user_id: 1,
			name: "xabley",
			password: "123indiozinhos",
			type: "private"
		}

		const response = await api.post(path, data);
		console.log(response);
		
	}

	render() {
		return (
			<div style = {div_style}>
				<form>
				<a href = "#" style = {close}>X</a>
				<h1 style = {h1_style}>Criar Sala</h1>

					<input
					style = {input}
					placeholder = 'NOME DA SALA' 
					value = {this.state.name}
					onChange = {e => this.setState({name: e.target.value})} 
					/>

					<input
					style = {input}
					type = "password"
					placeholder ='SENHA' 
					value = {this.state.password}
					onChange = {e => this.setState({password: e.target.value})} 
					/>

					<input
					type = "checkbox"
					value = {this.state.type}
					onChange = {() => this.setState((state, props) => ({
						type: state.type == 'private' ? 'public' : 'private'
					}))} 
					/>
					<label>Partida Privada</label>
					
					<button style = {button_style} type='button' onClick={(e) => this.onSubmit(e)}>Criar</button>
				</form>
			</div>
			);
	};
}
