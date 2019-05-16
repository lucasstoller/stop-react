import React from 'react';

export default class Board extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      title: 'Board'
    }
  }

  render(){
    return (
      <div>
        { this.state.title }
        <a href="/">Home</a>
      </div>
    )
  }
}