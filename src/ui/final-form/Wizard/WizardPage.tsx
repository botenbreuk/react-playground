import { ValidationErrors } from 'final-form';
import { ReactNode } from 'react';

export interface Props<T> {
  title: string;
  validate?: (
    values: T
  ) => ValidationErrors | Promise<ValidationErrors> | undefined;
  children: ReactNode;
}

export default function WizardPage<T>(props: Props<T>) {
  const { children } = props;

  return <>{children}</>;
}
