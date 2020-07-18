import { css } from 'styled-components';

export default () => css`
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
`;
