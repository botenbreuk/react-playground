import classNames from 'classnames';
import moment, { Moment } from 'moment';
import DateTime, { DatetimepickerProps } from 'react-datetime';
import { useField, UseFieldConfig } from 'react-final-form';
import { Error } from '..';
import { InfoPopup } from '../..';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import { FinalFieldProps } from '../types';

interface Props {
  id: string;
  name: string;
  className?: string;
  label: string;
  selectableDate?: (currentDate: Moment, selectedDate: Moment) => boolean;
  inline?: boolean;
  infoPopupText?: string;
  dateOnly?: boolean;
}

export default function JarbDateInput(
  props: Props & JarbFieldInputProps<string | Moment>
) {
  const { input, meta } = useJarbField({ ...props });

  return (
    <>
      <DateInput {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
      </div>
    </>
  );
}

export function DateInputField(props: Props & UseFieldConfig<string | Moment>) {
  const { input, meta } = useField(props.name, { ...props });

  return (
    <>
      <DateInput {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
      </div>
    </>
  );
}

export function DateInput(props: FinalFieldProps<Props, string | Moment>) {
  const {
    id,
    name,
    className,
    label,
    value,
    onChange,
    onBlur,
    inline,
    selectableDate,
    infoPopupText,
    dateOnly = false
  } = props;

  function handleOnChange(value: Moment | string) {
    if (typeof value === 'string') {
      onChange(moment(value));
    } else {
      onChange(value);
    }
  }

  const inputProps: DatetimepickerProps = {
    onChange: handleOnChange,
    initialValue: value,
    dateFormat: 'DD-MM-YYYY',
    timeFormat: dateOnly ? false : 'HH:mm',
    utc: true,
    closeOnSelect: true,
    isValidDate: selectableDate,
    inputProps: { name, onBlur, autoComplete: 'off' }
  };

  const classes = classNames(
    'form-group',
    {
      'form-group-inline': inline
    },
    className
  );

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      {infoPopupText ? <InfoPopup>{infoPopupText}</InfoPopup> : null}
      <DateTime {...inputProps} />
    </div>
  );
}
