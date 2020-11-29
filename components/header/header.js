import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Header = ({ className }) => (
  <div className={className}>
    <div className="header__logo">
      <Link href="/">
        <img src="/images/logo.png" alt="logo" />
      </Link>
    </div>
  </div>
);

Header.propTypes = {
  className: PropTypes.string.isRequired,
};
Header.defaultProps = {};

export default Header;
