import styled from 'styled-components';
import Room from './room-component';

export default styled(Room)`
  display: flex;
  align-items: center;
  justify-content: center;

  .component-room__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 780px;
  }
`;
