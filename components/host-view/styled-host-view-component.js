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
        display: flex;

        &:hover, &:active {
          background-color: #ccc;
        }
      }
    }
  }

  .card-list-item {
    margin: 0 0 10px 0;
  }

  .kick-guest-button {
    display: none;
    transform: rotate(45deg);
    font-size: 20px;
    position: absolute;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 0;
    top: 0;
    right: 0;
    width: 22px;
    height: 22px;
    background: #ddd;
    border-radius: 10px;
    border: none;
    border-radius: 100%;
  }
`;
