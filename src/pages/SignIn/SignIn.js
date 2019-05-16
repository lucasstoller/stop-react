import React from 'react';

export default class Signin extends React.Component{
  constructor(props){
    super(props);

    this.state = { }
  }

  render(){
    return (
      <div>
        <h1>Login</h1>
        <div>
          OU
          <a href='/signup'>Sign up</a>
        </div>
      </div>
    )
  }
}