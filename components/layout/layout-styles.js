import { css } from 'styled-components';

export default () => css`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;

  .layout__container {
    width: 100%;
    max-width: 612px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    text-align: center;

    main {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;

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
