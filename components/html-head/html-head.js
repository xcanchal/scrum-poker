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
      <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
      <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
      <link rel="icon" href="/favicon-96x96.png" type="image/png" sizes="96x96" />
      <link rel="icon" href="/favicon-196x196.png" type="image/png" sizes="196x196" />
      <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
      <meta name="description" content="Scrum Poker application. Sprint planning poker application with realtime communication. Estimate your sprint remotely with ease." />
      <meta name="keywords" content="scrum poker, planning poker, scrum, agile, sprint planning, remote sprint planning" />
      <meta name="author" content="Xavier Canchal" />
    </Head>
  );
}

HtmlHead.propTypes = {
  title: PropTypes.string,
};

HtmlHead.defaultProps = {
  title: 'Scrum Poker',
};
