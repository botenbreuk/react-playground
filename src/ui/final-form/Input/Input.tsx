import classNames from 'classnames';
import { useField } from 'react-final-form';
import PhoneInput from 'react-phone-input-2';
import { FormGroup } from 'reactstrap';
import { Error, FieldError } from '..';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import { getCountryCodes } from '../../../utils/phone';
import { FieldProps, FinalFieldProps } from '../types';
import locales from './locales.json';

interface Props {
  id: string;
  name: string;
  placeholder: string;
  className?: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  inline?: boolean;
  infoPopupText?: string;
  autoComplete?: string;
  isPhone?: boolean;
}

export default function JarbInput(props: Props & JarbFieldInputProps<string>) {
  const { input, meta } = useJarbField({ ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <Input {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function JarbPhoneInput(props: Props & JarbFieldInputProps<string>) {
  function parse(value: string) {
    const plusRegex = new RegExp('^\\+');
    return plusRegex.test(value) ? value : `+${value}`;
  }

  return <JarbInput {...props} parse={parse} isPhone />;
}

export function PhoneInputField(props: FieldProps<Props, string>) {
  function parse(value: string) {
    const test = new RegExp('^\\+');
    return test.test(value) ? value : `+${value}`;
  }

  return <InputField {...props} parse={parse} isPhone />;
}

export function InputField(props: FieldProps<Props, string>) {
  const { input, meta } = useField(props.name, { ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <Input {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function Input(props: FinalFieldProps<Props, string>) {
  const {
    id,
    className,
    label,
    value,
    onChange,
    onBlur,
    type = 'text',
    disabled = false,
    placeholder,
    infoPopupText,
    autoComplete,
    isPhone = false
  } = props;

  const inputProps = {
    type,
    value,
    onChange,
    onBlur,
    className: 'form-control',
    placeholder,
    id,
    disabled,
    autoComplete
  };

  const classes = classNames(
    {
      'form-group-inline': props.inline
    },
    className
  );

  const phoneInputProps = {
    className: 'form-control',
    style: { width: '100%' }
  };

  return (
    <FormGroup className={classes}>
      {label && <label htmlFor={id}>{label}</label>}
      {infoPopupText === undefined ? null : (
        <InfoPopup>{infoPopupText}</InfoPopup>
      )}
      {isPhone ? (
        <PhoneInput
          {...inputProps}
          localization={locales.nl}
          inputProps={phoneInputProps}
          country="nl"
          onlyCountries={getCountryCodes()}
          countryCodeEditable={false}
          copyNumbersOnly={false}
        />
      ) : (
        <input {...inputProps} />
      )}
    </FormGroup>
  );
}
