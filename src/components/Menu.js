import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faCoins, faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

export const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;  
  background-color: #6494F3;
  color: #fff;
  height: 8vh;
`;

export const NavItem = styled.li`
  margin-right: 25px;
  cursor: pointer;
  :hover {
    font-weight: bold;
    padding-bottom: 3px;
    margin-right: 20px;
  }
`;

function Menu(props){
  return (
    <Nav>
      <NavItem><FontAwesomeIcon icon={faStore} /> Store</NavItem>
      <NavItem><FontAwesomeIcon icon={faCoins} /> Credits</NavItem>
      <NavItem><FontAwesomeIcon icon={faUser} /> User</NavItem>
      <NavItem onClick={() => props.onLogout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavItem>
    </Nav>
  );
}

export default Menu;