import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Logo } from "./styles";
import { ParallaxButton } from "../../components/ParallaxButton"

class SignUp extends Component {
  state = {
    user: "",
    password: "",
    error: ""
  };

  handleSignUp = e => {
    e.preventDefault();
    alert("Eu vou te registrar");
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Usuário"
            onChange={e => this.setState({ user: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <ParallaxButton type="submit" color="#054EE1" bg-color="#2C2E63">Cadastrar-se grátis</ParallaxButton>
          {/* <button type="submit">Cadastrar grátis</button> */}
          <hr />ou
          <Link to="/signin">Fazer login</Link>
        </Form>
        <Logo></Logo>
      </Container>
    );
  }
}

export default SignUp;