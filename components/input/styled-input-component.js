import styled from 'styled-components';
import Input from './input-component';
import Colors from '../../constants/colors';

export default styled(Input)`
  display: flex;
  border: none;
  box-shadow: none;
  background: ${Colors.backgroundDark};
  border: none;
  border-radius: 4px;
  height: 40px;
  font-size: 1rem;
  color: ${Colors.white};
  padding: 16px;
  width: 100%;
  box-shadow: 0 0 0 0 rgba(0,0,0,0);
  transition: all 0.3s;

  &:hover, &:focus {
    background: ${Colors.backgroundDarker};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(15, 206, 113, 0.3);
  }

  ${({ size }) => size === 'lg' && `
    height: 60px;
    font-size: 1.3rem;
    padding: 20px;
  `}
`;
