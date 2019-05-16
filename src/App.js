import React from 'react';
import PropTypes from 'prop-types';

import Home from './pages/Home/Home';
import Board from './pages/Board/Board';
import FourOhFour from './pages/404';

const PAGES = {
  '/': Home,
  '/board': Board
};

export default class App extends React.Component {
  render() {
    const Handler = PAGES[this.props.pathname] || FourOhFour;

    return <Handler />;
  }
}

App.propTypes = {
  pathname: PropTypes.oneOf(Object.keys(PAGES)).isRequired,
};