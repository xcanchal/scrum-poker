import { useContext } from 'react';

import GlobalStateContext from './context';

/* const getPartialReducer = (state, dispatch, scope) => {
  const { [scope]: partialState } = state;

  const scopedDispatch = (...args) => {
    const [action] = args;
    dispatch({ ...action, scope });
  };

  return [partialState, scopedDispatch];
}; */

const useGlobalState = (/* scope */) => {
  const [state, dispatch] = useContext(GlobalStateContext);

 /*  if (scope) {
    return getPartialReducer(state, dispatch, scope);
  } */

  return [state, dispatch];
};

export default useGlobalState;
