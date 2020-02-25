import styled from 'styled-components';
import Join from './join-component';

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
`;
