import { css } from 'styled-components';

import Colors from '../../constants/colors';

export default () => css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 70px;
  box-shadow: 0 1px 0 0 rgba(0,0,0,.1);
  background-color: ${Colors.background};
  margin-bottom: 40px;

  .header__logo {
    display: flex;
    text-decoration: none;
    width: 200px;

    img {
      width: 100%;
    }
  }
`;
