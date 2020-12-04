import { useEffect, useCallback } from 'react';

const useEnterKey = (onEnterKey = null) => {
  const enterKeyHandler = useCallback((event) => {
    if (event.key === 'Enter' || event.which === 13 || event.keyCode === 13) {
      onEnterKey(event);
    }
  }, [onEnterKey]);

  useEffect(() => {
    window.addEventListener('keydown', enterKeyHandler, false);
    return () => {
      window.removeEventListener('keydown', enterKeyHandler);
    };
  }, [enterKeyHandler]);
};

export default useEnterKey;
