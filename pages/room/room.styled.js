import { css } from 'styled-components';

const roomStyles = () => css`
  display: flex;
  align-items: center;
  justify-content: center;

  .component-room__title {
    display: flex;
  }

  .component-room__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 780px;
    text-align: center;

    a {
      display: block;
    }
  }
`;

export default roomStyles;
