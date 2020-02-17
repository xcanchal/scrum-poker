import styled from 'styled-components';
import CardListItem from './card-list-item-component';

export default styled(CardListItem)`
  width: 100px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  margin: 8px;
  border-radius: 8px;
  font-weight: 300;
  font-size: 2rem;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #444;
  }
`