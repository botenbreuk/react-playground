import classNames from 'classnames';
import { ReactNode } from 'react';
import { useField } from 'react-final-form';
import { Error } from '..';
import { InfoPopup } from '../..';
import { SelectableValue } from '../../../core';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import Label from '../../Label/Label';
import FieldError from '../FieldError/FieldError';
import { FieldProps, FinalFieldProps } from '../types';

interface Props {
  children?: ReactNode[];
  options?: SelectableValue[];
  id: string;
  className?: string;
  label: string;
  inline?: boolean;
  hasEmptyOption?: boolean;
  emptyOptionText?: string; // if hasEmptyOption is true and emptyOptionText not is set, value of label will be used
  disabled?: boolean;
  multiple?: boolean;
  infoPopupText?: string;
}

export default function JarbSelect(props: Props & JarbFieldInputProps<string>) {
  const { input, meta } = useJarbField({ ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <Select {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function SelectField(props: FieldProps<Props, string>) {
  const { input, meta } = useField(props.name, { ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <Select {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function Select(props: FinalFieldProps<Props, string>) {
  const {
    id,
    className,
    label,
    inline,
    onChange,
    onBlur,
    children,
    hasEmptyOption,
    emptyOptionText,
    disabled,
    multiple,
    infoPopupText,
    options
  } = props;

  const classes = classNames(
    'form-group',
    {
      'form-group-inline': inline
    },
    className
  );

  const value = props.value || (hasEmptyOption ? '' : undefined);

  const selectProps = {
    className: 'form-control',
    id,
    value,
    onChange,
    onBlur,
    disabled,
    multiple
  };

  return (
    <div className={classes}>
      <Label id={id} label={label} />
      {infoPopupText === undefined ? null : (
        <InfoPopup>{infoPopupText}</InfoPopup>
      )}
      <select {...selectProps}>
        {hasEmptyOption ? (
          <EmptyOption label={label} emptyOptionText={emptyOptionText} />
        ) : null}
        {options
          ? options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
    </div>
  );
}

type EmptyOptionProps = {
  enabled?: boolean;
  label: string;
  emptyOptionText?: string;
};

export function EmptyOption({ label, emptyOptionText }: EmptyOptionProps) {
  const text = emptyOptionText
    ? emptyOptionText
    : '- selecteer ' + label.toLocaleLowerCase() + ' -';
  return (
    <option value="" disabled>
      {text}
    </option>
  );
}
