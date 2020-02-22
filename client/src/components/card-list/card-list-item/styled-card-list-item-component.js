import styled from 'styled-components';
import CardListItem from './card-list-item-component';

export default styled(CardListItem)`
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-weight: 300;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.3s;

  ${({ selected }) => selected && `
    color: #00e676;
    border-color: #00e676;
  `}

  &:hover {
    color: #00e676;
    border-color: #00e676;
  }
`