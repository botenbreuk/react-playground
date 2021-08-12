import classNames from 'classnames';
import { useField, UseFieldConfig } from 'react-final-form';
import { Error, FieldError } from '../';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import { InfoPopup } from '../../index';
import { FinalFieldProps } from '../types';

interface Props {
  id: string;
  name: string;
  placeholder?: string;
  className?: string;
  label: string;
  rows: number;
  inline?: boolean;
  infoPopupText?: string;
}

export default function JarbTextArea(
  props: Props & JarbFieldInputProps<string>
) {
  const { input, meta } = useJarbField({ ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <Textarea {...props} {...input} />
      <div className="col-xs-12">
        <Error meta={meta} />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function TextAreaField(props: Props & UseFieldConfig<string>) {
  const { input, meta } = useField(props.name, { ...props });

  return (
    <>
      <Textarea {...props} {...input} />
      <Error meta={meta} />
    </>
  );
}

export function Textarea(props: FinalFieldProps<Props, string>) {
  const {
    id,
    className,
    label,
    rows,
    value,
    onChange,
    onBlur,
    placeholder,
    infoPopupText
  } = props;

  const textareaProps = {
    rows,
    value,
    onChange,
    onBlur,
    className: 'form-control',
    placeholder,
    id
  };

  const classes = classNames(
    'form-group',
    {
      'form-group-inline': props.inline
    },
    className
  );

  return (
    <div className={classes}>
      <label htmlFor={id}>{label}</label>
      {!infoPopupText ? null : <InfoPopup>{infoPopupText}</InfoPopup>}
      <textarea {...textareaProps} />
    </div>
  );
}
