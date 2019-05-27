import React from 'react';
import Logo from './assets/wood.png'
import Button from './assets/red_button.png'
import Ink from './assets/tinta.png'
import styled from 'styled-components'
import Math from './assets/conta.png'
import Math2 from './assets/conta_bem_perto.png'
import Notepad from './assets/notepad.png'
import NotepadPaper from './assets/notepad_paper.png'

export const Container = styled.div`
  height: 98vh;
  background-image: url(${Logo});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ExitButton = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "white" : "red"};
  color: ${props => props.primary ? "red" : "white"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const input = {
	'width': '40%',
	'margin-bottom': '20px',
	'border': 'none',
	'border-bottom': '1px solid #fff',
	'bottom': '200px',
	'border-style': 'solid',
	'border-width': '1px',
	'top': '1000px',
	'border-radius':'7px',
}

const redButton = {
	 'float' : 'right',
	 'width': '500px',
     'height': 'auto',
     'margin-left': '0px', 
	 'margin-top': '0px',
	 'margin-right': '0px',
	 'margin-bottom': '5px',
}

const InkStyle = {
	 'width': '450px',
     'height': 'auto',
     'position': 'relative',
	 'right': '-10px',
	 'bottom': '-150px',
	 'z-index': 0
} 

const mathsStyle = {
	'position': 'relative',
	'float' : 'right',
	'width': '100px',
    'height': 'auto',
    'bottom': '-300px',
    'right': '-350px'
}

const LeaveMatch = {
	'position': 'absolute',
	'float' : 'right',
	'width': '200px',
    'height': '50px',
    'bottom': '00px',
    'right': '100px'
}

const notePadStyle = {
	'position': 'relative',
	'float' : 'right',
	'width': '200px',
    'height': 'auto',
    'bottom': '160px',
    'right': '-550px'
}

const notePadPaperStyle = {
	'position': 'relative',
	'float' : 'right',
	'width': '330px',
    'height': 'auto',
    'bottom': '200px',
    'right': '121px'
}

const FlexContainer = {
 	'display': 'flex',
 	'flex-direction': 'column',
 	'position': 'relative',
  	'top': '40%',
  	'left': '50%',
  	'margin-top': '0px',
  	'margin-left': '-350px',
  	'margin-right': '500px',
 }

export default class CreateARoom extends React.Component {
	constructor(props){
    super(props);

    this.state = { 
			palavra_1: "",
			palavra_2: "",
			palavra_3: "",
			palavra_4: ""
		}
  }

	onSubmit(){
		alert('Comming soon');
	}

	render() {
		return (
			<Container>

				<form style = {FlexContainer}>
							<input
							style = {input}
							placeholder = '' 
							value = {this.state.palavra_1}
							onChange = {e => this.setState({palavra_1: e.target.value})} 
							/>

							<input
							style = {input}
							placeholder ='' 
							value = {this.state.palavra_2}
							onChange = {e => this.setState({palavra_2: e.target.value})} 
							/>

							<input
							style = {input}
							placeholder ='' 
							value = {this.state.palavra_3}
							onChange = {e => this.setState({palavra_3: e.target.value})} 
							/>

							<input
							style = {input}
							placeholder ='' 
							value = {this.state.palavra_4}
							onChange = {e => this.setState({palavra_4: e.target.value})} 
							/>

						</form>
					
					<div>
						<a href = '#'>
							<img src = {Button} style = {redButton} />
						</a>
						
						<img src = {Math} style = {mathsStyle} />
						<img src = {Math2} style = {mathsStyle} />
						<img src = {Notepad} style = {notePadStyle}/>
						<img src = {NotepadPaper} style = {notePadPaperStyle}/>
					</div>

					<a href = '/'>
						<ExitButton style = {LeaveMatch} >Deixar Partida</ExitButton>
					</a>
					
			</Container>
			);
	};
}