import styled from 'styled-components';
import Button from './button-component';
import Colors from '../../constants/colors';

export default styled(Button)`
  display: flex;
  border: none;
  box-shadow: none;
  background: ${Colors.primary};
  border-radius: 4px;
  font-size: 1rem;
  padding: 12px 20px;
  cursor: pointer;
  color: ${Colors.white};
  width: 100%;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 0 0 0 rgba(0,0,0,0);

  &:hover, &:active {
    background: ${Colors.primaryLight};
  }

  ${({ size }) => size === 'lg' && `
    font-size: 1.3rem;
    padding: 20px 24px;
  `}

  ${({ size }) => size === 'sm' && `
    padding: 8px 16px;
  `}

  ${({ disabled }) => disabled && `
    cursor: default;
    pointer-events: none;
    background-color: ${Colors.backgroundLight};

    &:focus {
      box-shadow: none;
    }
  `}
`;
