import styled from 'styled-components';
import SessionEnd from './session-end-component';

export default styled(SessionEnd)`
  display: flex;
  align-items: center;
  justify-content: center;

  .component-session-end__content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: 780px;
    text-align: center;
    margin-top: 50px;
  }
`;
