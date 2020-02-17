import { css, createGlobalStyle } from 'styled-components';

const GlobalStyles = css`
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6, p, span, ul, li, b, strong, i, a, span {
    margin-top: 0;
    font-family: 'Helvetica Neue', Arial, Sans-serif;
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
  }
`;

export default createGlobalStyle`
  ${GlobalStyles}
`;
