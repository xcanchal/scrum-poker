import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png';

const Header = ({ className }) => (
  <div id="component-header" className={`${className}`}>
    <div id="scrum-poker-logo"><Link to="/"><img src={Logo} alt="logo" /></Link></div>
  </div>
);

Header.propTypes = {
  className: PropTypes.string.isRequired,
};
Header.defaultProps = {};

export default Header;
