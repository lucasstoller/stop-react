import React from 'react';

export default class Signup extends React.Component{
  constructor(props){
    super(props);

    this.state = { }
  }

  render(){
    return (
      <div>
        <h1>Sign up</h1>
        <div>
          OU
          <a href='/signin'>Login</a>
        </div>
      </div>
    )
  }
}