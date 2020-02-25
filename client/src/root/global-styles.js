import { css, createGlobalStyle } from 'styled-components';
import Colors from '../constants/colors';

const GlobalStyles = css`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: ${Colors.background}
  }

  #app {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6, p, span, ul, li, b, strong, i, a, span, small {
    margin-top: 0;
    font-family: 'Helvetica Neue', Arial, Sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${Colors.greyLighter};
  }

  p, ul, li, a, i, span, b, strong {
    color: ${Colors.paragraph};
  }

  a {
    color: ${Colors.primaryText};
    transition: all 0.3s;
  }

  a:hover, a:active {
    color: ${Colors.primaryLight};
  }

  .layout-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: white;
  }

  .layout-content {
    padding: 80px 24px 24px 24px;
    height: calc(100vh - 80px);
    min-height: 500px;
  }
`;

export default createGlobalStyle`
  ${GlobalStyles}
`;
