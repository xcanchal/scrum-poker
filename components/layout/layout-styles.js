import { css } from 'styled-components';

export default () => css`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .layout-container {
    width: 100%;
    max-width: 612px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    main {
      padding-top: 40px;
      display: flex;
      flex: 1;

      section {
        width: 100%;
      }
    }
  }

  @media (max-width: 679px) {
    .layout-container {
      background-color: var(--color-white);
      min-height: 100vh;
      max-width: none;

      main {
        padding-top: 20px;
      }
    }
  }
`;
