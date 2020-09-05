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
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.shape.isRequired,
};

GlobalStateProvider.defaultProps = {
  children: null,
};

export default GlobalStateProvider;
