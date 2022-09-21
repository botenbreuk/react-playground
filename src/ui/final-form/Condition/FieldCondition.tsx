import { ReactNode } from 'react';
import { Field } from 'react-final-form';

interface Props<T> {
  when: string;
  is?: T;
  condition?: (value: T) => boolean;
  children: ReactNode;
}

export default function FieldCondition<T>({
  when,
  is,
  children,
  condition
}: Props<T>) {
  return (
    <Field<T> name={when} subscription={{ value: true }}>
      {({ input: { value } }) =>
        (condition ? condition(value) : value === is) ? children : null
      }
    </Field>
  );
}
