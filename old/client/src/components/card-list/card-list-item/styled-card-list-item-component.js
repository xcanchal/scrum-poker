import styled from 'styled-components';
import CardListItem from './card-list-item-component';

import Colors from '../../../constants/colors';

export default styled(CardListItem)`
  width: 140px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 300;
  font-size: 3.3rem;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${Colors.primaryText};
  border: 5px solid ${Colors.primaryLight};
  box-shadow: 0 5px 10px 5px rgba(0,0,0,.25);
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;

  &:hover {
    color: #1f754b;
    background-color: #39f197;
    border-color: #87ffc4;
    box-shadow: 0px 10px 20px 10px rgba(0,0,0,.5);

    span {
      color: #1e774c;
    }
  }

  span {
    color: ${Colors.primaryTextDark};
  }

  small {
    font-size: 0.8rem;
    display: flex;
    font-weight: 400;
    text-align: center;
  }

  ${({ error }) => error && `
    background-color: ${Colors.error};
    border-color: ${Colors.errorLight};

    span {
      color: ${Colors.errorText};
    }
  `}

  ${({ disabled }) => disabled && `
    background-color: #38384c;
    border-color: #47475f;
    pointer-events: none;

    span {
      color: #1d1d27;
    }

    small {
      color: #1d1d28;
    }
  `}

  ${({ revealed, selected }) => (revealed || selected) && `
    background-color: ${Colors.greyLighter};
    border-color: ${Colors.white};
    pointer-events: none;

    &:hover {
      background-color: ${Colors.greyLighter};
      border-color: ${Colors.white};
    }

    span {
      color: ${Colors.greyDarker};
    }
  `}

  ${({ readOnly }) => readOnly && `
    pointer-events: none;
  `}
`