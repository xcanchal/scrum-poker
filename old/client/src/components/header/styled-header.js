import styled from 'styled-components';
import Header from './header';
import Colors from '../../constants/colors';

export default styled(Header)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 70px;
  box-shadow: 0 1px 0 0 rgba(0,0,0,.1);
  background-color: ${Colors.background};

  #scrum-poker-logo a {
    display: flex;
    text-decoration: none;
    width: 200px;

    &:focus {
      outline: none;
    }

    img {
      width: 100%;
    }
  }
`;
