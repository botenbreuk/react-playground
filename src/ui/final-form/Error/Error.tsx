import { ValidationError } from '@42.nl/jarb-final-form';
import { isArray } from 'lodash';
import { FieldMetaState } from 'react-final-form';

interface Props {
  meta: FieldMetaState<any>;
}

export default function Error(props: Props) {
  const { invalid, error, touched } = props.meta;

  if (invalid && touched) {
    return (
      <div className="alert alert-danger xs-mt-5 mb-3">
        {typeof error === 'string'
          ? error
          : errorMessage(isArray(error) ? error[0] : error)}
      </div>
    );
  }

  return null;
}

function errorMessage(error: ValidationError): string {
  switch (error.type) {
    case 'ERROR_REQUIRED':
      return `${error.label} is verplicht`;
    case 'ERROR_MINIMUM_LENGTH':
      return `${error.label} mag niet minder dan ${error.reasons.minimumLength} karakters bevatten`;
    case 'ERROR_MAXIMUM_LENGTH':
      return `${error.label} mag niet meer dan ${error.reasons.maximumLength} karakters bevatten`;
    case 'ERROR_MIN_VALUE':
      return `${error.label} mag niet minder zijn dan ${error.reasons.minValue}`;
    case 'ERROR_MAX_VALUE':
      return `${error.label} mag niet meer zijn dan ${error.reasons.maxValue}`;
    case 'ERROR_NUMBER':
      return `${error.label} getal voldoet niet aan het juiste formaat: ${error.reasons.regex}`;
    case 'ERROR_NUMBER_FRACTION':
      return `${error.label} getal voldoet niet aan het juiste formaat: ${error.reasons.regex}`;
    default:
      return error;
  }
}
