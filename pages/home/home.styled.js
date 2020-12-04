import { css } from 'styled-components';

const homeStyles = () => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .component-home__content {
    display: flex;
    flex-direction: column;
    width: 450px;
    margin: 0 auto;
  }

  .component-home__input,
  .component-home__button {
    margin-bottom: 16px;
    display: flex;
  }

  @media (max-width: 679px) {
    .component-home__content {
      width: 100%;
      padding: 0 5%;
    }
  }
`;

export default homeStyles;
