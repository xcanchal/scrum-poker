import App from 'next/app';

import { GlobalStateProvider } from '../context/global-state';
import { SocketProvider } from '../context/socket';
import GlobalStyles from '../styles/app-styles';

import { reducer, initialState } from '../reducer';

/* eslint-disable react/jsx-props-no-spreading */

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <SocketProvider>
          <GlobalStateProvider reducer={reducer} initialState={initialState}>
            <GlobalStyles />
            <Component {...pageProps} />
          </GlobalStateProvider>
        </SocketProvider>
      </>
    );
  }
}
