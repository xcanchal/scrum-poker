import { useContext } from 'react';

import GlobalStateContext from './context';

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  return [state, dispatch];
};

export default useGlobalState;
