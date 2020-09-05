import styled from 'styled-components';
import Select from './select-component';
import Colors from '../../constants/colors';

export default styled(Select)`
  display: flex;
  border: none;
  box-shadow: none;
  background: ${Colors.backgroundDark};
  border: none;
  border-radius: 4px;
  height: 60px;
  margin-bottom: 16px;
  font-size: 1rem;
  color: ${Colors.white};
  padding: 16px;
  width: 100%;
  box-shadow: 0 0 0 0 rgba(0,0,0,0);
  transition: all 0.3s;
  cursor: pointer;

  &:hover, &:focus {
    background: ${Colors.backgroundDarker};
  }

  ${({ size }) => size === 'lg' && `
    height: 60px;
    font-size: 1.3rem;
    padding: 20px;
  `}
`;
