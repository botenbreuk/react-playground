import { useErrorsForValidator } from '@42.nl/react-error-store';

interface Props {
  fieldName: string;
}

export default function FieldError(props: Props) {
  const { fieldName } = props;
  const errors = useErrorsForValidator(fieldName);

  if (!errors || errors.length === 0) {
    return null;
  }

  return <div>{errors.map(fieldError => renderError(fieldError))}</div>;

  function renderError(fieldError: string) {
    return (
      <div
        key={fieldError}
        className="alert alert-danger"
        style={{ wordBreak: 'break-word' }}
        role="alert"
      >
        {fieldError}
      </div>
    );
  }
}
