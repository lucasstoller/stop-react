import React from 'react';
import api from '../../services/api';
import Select from 'react-select';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const div_style = {
	width: '320px', height: '220',	
	background: '#5D92EC',
	color: 'white', top: '50%', left:'50%', position: 'absolute',
	transform: 'translate(-50%, -50%)',
	padding: '70px 30px',
	borderRadius: '10px'
}

const h1_style = {
	margin: '0', 
	padding: '0 0 20px',
	textAlign: 'center', 
	fontSize: '22px'
}

const input = {
	width: '100%',
	marginBottom: '20px',
	border: 'none',
	borderRadius: '3px',
	borderBottom: '1px solid #fff',
	height: '35px',
	borderStyle: 'solid',
	borderWidth: '1px'
}

const button_style = {
	display: 'block',
	width: '55px',
	height: '35px',
	marginTop: '1em',
	borderRadius: '5px',
	fontWeight: '500',
	boxShadow: '0 0.5rem 1.1rem 0 rgba(22,75,195,0.50)'
}	

const selectBox_style = {
	option: (provided, state) => ({
		...provided,
		color: 'black',
		padding: 10,		
	}),
}


export default class CreateARoom extends React.Component {
	constructor(props){
    super(props);

    this.state = {
			name: "",
			password: "",
			type: "public",			
			options: [],
			values: [],
			passwordBool: true,
			errorMessage: "Ocorreu um erro ao tentar processar",
			warningMessage: "Há inconsistências! Verifique os dados e tente novamente",
			successMessage: "Sala criada com sucesso!"
		}
  }

	componentWillMount = async() => {
		const {data} = await api.get('/room/themes');
		this.setState({options: data})
	}

	resetValues = () => {
		this.setState({name: '', password: '', values: '', type: "public" })
		this.refs.check.checked = false;
	}

	async handleSubmit(e){

		const { name, password, type, values } = this.state
		
		if (name == "" || (password == "" && type == "private") || values.length < 4 ){
			e.preventDefault();
			Alert.error(this.state.warningMessage, {position: 'top-left', effect: 'scale', beef: false, timeout: 2500, offset: -1});
			return;		
		}
		
		const themes_2_send = values.map(x => {
			return x.label
		})

		const data = {
			user_id: this.props.user.id,
			name,
			password,
			type,
			themes: themes_2_send
		}
	
		const response = await api.post('/rooms', data);
		
		if(response.status == 200){
			this.resetValues();			
			Alert.success(this.state.successMessage, {position: 'top-left', effect: 'scale', beef: false, timeout: 2500, offset: -1});			
		}
		else
			Alert.error(this.state.errorMessage, {position: 'top-left', effect: 'scale', beef: false, timeout: 2500, offset: -1});
			
	}

	render() {
	
		const { options } = this.state;

		const selectbox = (options) => options.map(({ id, name }) => {
			return { label: name, value: id }
	  	})

        return (
			<div>
				<Alert stack={{limit: 1}} />

				<div style = {div_style}>
					<form>
					<h1 style = {h1_style}>Criar Sala</h1>
						<input
						style = {input}					
						placeholder = 'Nome da Sala' 
						value = {this.state.name}
						onChange = {e => this.setState({name: e.target.value})} 
						/>

						<input
						style = {input}
						type = "password"
						placeholder ='Senha'
						disabled = {this.state.passwordBool}
						value = {this.state.password}
						onChange = {e => this.setState({password: e.target.value})} 
						/>
						
						<Select
						value={this.state.values}
						styles={selectBox_style}
						options={this.state.values.length >= 4 ?
								this.state.values : selectbox (options)}
						onChange={values => this.setState({ values })}
						isMulti
						placeholder="Selecione os temas..."
						/>	

						<input
						type = "checkbox"
						ref = "check"
						style = {{marginTop: '15px'}}					
						value = {this.state.type}
						onChange = {() => this.setState((state, props) => ({
							type: state.type == 'private' ? 'public' : 'private',
							passwordBool: !this.state.passwordBool,
							password: state.password == ""? state.password : ""
						}))} 
						/>
						<label>Partida Privada</label>
						
						<button style={button_style} onClick={(e) => this.handleSubmit(e)}>Criar</button>					
						
					</form>			
				</div>
			 </div>
		);
	};
}
