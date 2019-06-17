import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faPlusSquare, faSearch, faTrophy} from '@fortawesome/free-solid-svg-icons'

export const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;  
  height: 51px;
`;

export const NavItem = styled.li`
  background-color: #8791A4;
  color: #fff;
  padding: 1vw 2vw;
  margin-right: 25px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    padding: 1vw 3vw;
    background-color: #24A7FF; 
    transition-duration: .5s;
  }
`;

function Options(props){
  return (
    <Nav>
      <NavItem onClick={() => props.onChangeOption('ComingSoon')}>
        <FontAwesomeIcon icon={faHandshake} /> MATCHMAKING
      </NavItem>
      
      <NavItem onClick={() => props.onChangeOption('CreateARoom')}>
        <FontAwesomeIcon icon={faPlusSquare} /> CRIAR SALA
      </NavItem>
      
      <NavItem onClick={() => props.onChangeOption('SearchARoom')}>
        <FontAwesomeIcon icon={faSearch} /> PROCURAR SALA
      </NavItem>
      
      <NavItem onClick={() => props.onChangeOption('ComingSoon')}>
        <FontAwesomeIcon icon={faTrophy} /> RANKING
      </NavItem>
    </Nav>
  );
}

export default Options;