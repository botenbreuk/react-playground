import { addWarning } from '@42.nl/react-flash-messages';
import { useState } from 'react';
import getAxiosError from '../../core/middleware/middleware';

type Return = {
  loading: boolean;
  fnWithLoading: (fn: () => Promise<void>) => Promise<void>;
  setLoading: (loading: boolean) => void;
};

export default function useFnWithLoading(): Return {
  const [loading, setLoading] = useState(false);

  async function fnWithLoading(fn: () => Promise<void>) {
    setLoading(true);
    try {
      await fn();
    } catch (error) {
      const { errorCode } = getAxiosError(error);
      addWarning({
        text: errorCode || 'Er is iets verkeerd gegaan!'
      });
    }
    setLoading(false);
  }

  return { loading, fnWithLoading, setLoading };
}
