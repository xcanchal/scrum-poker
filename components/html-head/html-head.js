/**
 * This source code is and remains the property of UserZoom Technologies Inc (sucursal en España).
 * Dissemination of this information or reproduction of this material is strictly
 * forbidden unless prior written permission is obtained from
 * UserZoom Technologies Inc (sucursal en España) (https://www.userzoom.com).
 * */
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function HtmlHead({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    </Head>
  );
}

HtmlHead.propTypes = {
  title: PropTypes.string,
};

HtmlHead.defaultProps = {
  title: 'Scrum Poker',
};
