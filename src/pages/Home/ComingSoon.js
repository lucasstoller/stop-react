import React, {Fragment} from 'react';
import bgImage from '../../assets/comingsoon.png';


const imgStyle = {    
    display: 'block',
    margin: 'auto',
    Height: '400px',
    width: '800px',
}

const divStyle = {    
    position: 'relative'    
}

export class ComingSoon extends React.Component{
  constructor({ props }){
    super(props);
  }

  render() {

    return (
        <div style={divStyle}>
            <img style={imgStyle} src={bgImage} alt="Logo"/>
        </div>
    )
  }
}

export default ComingSoon;