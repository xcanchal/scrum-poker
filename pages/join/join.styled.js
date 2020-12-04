import styled from 'styled-components';

import Join from './join.logic';

export default styled(Join)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .component-join__content {
    display: flex;
    flex-direction: column;
    width: 450px;
    margin: 0 auto;
  }

  .component-join__input,
  .component-join__button {
    margin-bottom: 16px;
    display: flex;
  }

  @media (max-width: 679px) {
    .component-join__content {
      width: 100%;
      padding: 0 5%;
    }
  }
`;
