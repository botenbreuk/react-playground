import React, { ReactNode, RefObject, useEffect, useState } from 'react';

interface Props {
  /**
   * Name of the element that the component should render as.
   * Defaults to 'div'.
   */
  element?: string;
  /**
   * Whether there are more items to be loaded. Event listeners are removed if false.
   * Defaults to false.
   */
  hasMore?: boolean;
  /**
   * Whether the component should load the first set of items.
   * Defaults to true.
   */
  initialLoad?: boolean;
  /**
   * Whether new items should be loaded when user scrolls to the top of the scrollable area.
   * Default to false.
   */
  isReverse?: boolean;
  /**
   * A callback for when more items are requested by the user.
   * Page param is next page index.
   */
  loadMore(page: number): void;
  /**
   * The number of the first page to load, with the default of 0, the first page is 1.
   * Defaults to 0.
   */
  pageStart?: number;
  /**
   * The distance in pixels before the end of the items that will trigger a call to loadMore.
   * Defaults to 250.
   */
  threshold?: number;
  /**
   * Proxy to the useCapture option of the added event listeners.
   * Defaults to false.
   */
  useCapture?: boolean;
  /**
   * Add scroll listeners to the window, or else, the component's parentNode.
   * Defaults to true.
   */
  useWindow?: boolean;
  /**
   * Loader component for indicating "loading more".
   */
  loader?: React.ReactElement;
  /**
   * Override method to return a different scroll listener if it's not the immediate parent of InfiniteScroll.
   */
  getScrollParent?(): HTMLElement | null;

  totalPages?: number;

  children?: ((props: { bla: string }) => ReactNode) | ReactNode;
  ref?: RefObject<any>;
}

export default function InfiniteScroll(props: Props) {
  const {
    children,
    element = 'div',
    hasMore = false,
    initialLoad = true,
    pageStart = 0,
    ref = null,
    threshold = 250,
    useWindow = true,
    isReverse = false,
    useCapture = false,
    loader = null,
    getScrollParent = null,
    loadMore,
    totalPages = 0
  } = props;

  const [current, setCurrent] = useState(pageStart);

  useEffect(() => {
    async function doSomething() {
      if (current <= totalPages) {
        const loaded = current + 1;
        await loadMore(loaded);
        setCurrent(loaded);
      }
    }
    doSomething();
  }, [current, loadMore, totalPages]);

  return typeof children === 'function' ? children({ bla: 'bla' }) : children;
}