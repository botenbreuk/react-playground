import { emptyPage, Page } from '@42.nl/spring-connect';
import { useCallback, useEffect, useState } from 'react';
import { mergePagesOrReset } from '../../utils/page';

interface LoadPageOptions<T, P> {
  pageRequest: (pageNumber: number, queryParams: P) => Promise<Page<T>>;
  queryParams?: P;
  pageNumber?: number;
  mergePages?: boolean;
}

interface LoadPageReturn<T> {
  loading: boolean;
  loadPage: (pageNumber: number) => void;
  pageItems: Page<T>;
}

export default function useLoadPage<T, P>(
  options: LoadPageOptions<T, P>
): LoadPageReturn<T> {
  const {
    pageRequest,
    queryParams,
    pageNumber = 1,
    mergePages = true
  } = options;
  const [loading, setLoading] = useState(true);
  const [pageItems, setPageItems] = useState(emptyPage<T>());

  const loadPage = useCallback(
    async (pageNumber: number) => {
      const newPageItems = await pageRequest(pageNumber, queryParams as P);
      setPageItems(pageItems =>
        mergePages ? mergePagesOrReset(pageItems, newPageItems) : newPageItems
      );
    },
    [queryParams, pageRequest, mergePages]
  );

  const loadPageWithoutParams = useCallback(
    async (pageNumber: number) => {
      const newPageItems = await pageRequest(pageNumber, {} as P);
      setPageItems(pageItems =>
        mergePages ? mergePagesOrReset(pageItems, newPageItems) : newPageItems
      );
    },
    [pageRequest, mergePages]
  );

  useEffect(() => {
    async function init() {
      setLoading(true);
      if (!queryParams) {
        await loadPageWithoutParams(pageNumber);
      } else {
        await loadPage(pageNumber);
      }
      setLoading(false);
    }

    init();
  }, [loadPage, loadPageWithoutParams, queryParams, pageNumber]);

  return { loading, loadPage, pageItems };
}
