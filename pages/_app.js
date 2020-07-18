import App from 'next/app';

import { SocketProvider } from '../context/socket';
import GlobalStyles from '../styles/app-styles';

/* eslint-disable react/jsx-props-no-spreading */

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <SocketProvider>
          <GlobalStyles />
          <Component {...pageProps} />
        </SocketProvider>
      </>
    );
  }
}
