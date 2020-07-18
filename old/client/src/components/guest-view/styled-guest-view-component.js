import styled from 'styled-components';
import GuestView from './guest-view-component';
import Colors from '../../constants/colors';

export default styled(GuestView)`
  .component-guest-view__card-wrap {
    padding: 8px;
    position: relative;
  }

  .card-list-item {
    margin: 0 0 10px 0;
  }
`;
