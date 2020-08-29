import { useReducer } from 'react';
import PropTypes from 'prop-types';

import GlobalStateContext from './context';

const GlobalStateProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalStateContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node,
  reducer: PropTypes.func,
  initialState: PropTypes.shape,
};

GlobalStateProvider.defaultProps = {
  children: null,
  reducer: () => {},
  initialState: {},
};

export default GlobalStateProvider;
