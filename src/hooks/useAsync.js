import { useCallback, useEffect, useState } from "react";

export const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (params) => {
    setPending(true);
    setValue(null);
    setError(null);

    try {
      const res = await asyncFunction(params);

      setValue(res.data);

      return res;
    } catch ({response}) {

      setError(response.data.errors);

      return response;
    } finally {
      setPending(false)
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, pending, value, error };
};