import styled from 'styled-components';
import HostView from './host-view-component';

export default styled(HostView)`
  .component-host-view__button {
    display: inline-block;
    width: auto;
    margin-top: 16px;
  }

  .component-host-view__cards {
    display: flex;
    justify-content: center;
  }

  .component-host-view__card-wrap {
    padding: 8px;
    text-align: center;
    position: relative;

    &:hover {
      .kick-guest-button {
        display: block;
      }
    }
  }

  .card-list-item {
    margin: 0 0 10px 0;
  }

  .kick-guest-button {
    cursor: pointer;
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: #ddd;
    font-family: helvetica;
    border-radius: 10px;
    border: none;
  }
`;
