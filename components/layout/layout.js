/**
 * This source code is and remains the property of UserZoom Technologies Inc (sucursal en España).
 * Dissemination of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from
 * UserZoom Technologies Inc (sucursal en España) (https://www.userzoom.com).
 * */
import PropTypes from 'prop-types';

import Header from '../header';

export default function Layout({ children, className }) {
  return (
    <div className={className}>
      <Header />
      <div className="layout__container">
        <main>{children}</main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.func]),
  className: PropTypes.string.isRequired,
};

Layout.defaultProps = {
  children: () => null,
};
