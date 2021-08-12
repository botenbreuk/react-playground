import { Field } from 'react-final-form';
import Error from './Error';

export default function FinalError({ name }: { name: string }) {
  return (
    <Field
      name={name}
      subscribe={{ touched: true, error: true }}
      render={({ meta }) => <Error meta={meta} />}
    />
  );
}
