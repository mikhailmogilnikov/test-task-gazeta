/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { QueryParams } from '../model/query-params.type';

type ApiHook = (
  query: (
    queryParams?: QueryParams,
    options?: number | string,
  ) => Promise<unknown>,
  queryParams?: QueryParams,
  options?: number | string,
) => {
  data: unknown;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const useApiHook: ApiHook = (query, queryParams, options) => {
  const [data, setData] = useState<unknown>(null);
  const [isError, setIsError] = useState(false);
  const [refetchCount, setRefecthCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const refetch = () => {
    setRefecthCount(refetchCount + 1);
  };

  useEffect(() => {
    setLoading(true);
    const loadQuery = async () => {
      try {
        console.log('resp');
        const response = await query(queryParams, options);
        setData(response);
        setLoading(false);
      } catch {
        setIsError(true);
        setLoading(false);
      }
    };
    loadQuery();
  }, [refetchCount]);

  return { data, isLoading, isError, refetch };
};
