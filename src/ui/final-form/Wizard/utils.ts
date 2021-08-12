import { Children, ReactNode } from 'react';
import { Props as WizardPageProps } from './WizardPage';

type ChildrenObject<T> = {
  props: WizardPageProps<T>;
};

export function getChildren<T>(children: ReactNode | ReactNode[]) {
  return Children.toArray(children) as ChildrenObject<T>[];
}
