import { Page } from '@42.nl/spring-connect';

export function mergePagesOrReset<T>(page1: Page<T>, page2: Page<T>): Page<T> {
  // A new search was made so page 2 is the first page and should be the new base.
  if (page2.number <= 1) {
    return page2;
  }

  // the next page was loaded, so merge page content.
  return { ...page2, content: [...page1.content, ...page2.content] };
}
