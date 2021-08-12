import classNames from 'classnames';
import { omit } from 'lodash';
import { useField, UseFieldConfig } from 'react-final-form';
import { Error } from '..';
import { FinalFieldProps } from '../types';

interface Props {
  id: string;
  name: string;
  className?: string;
  label: string;
  title: string;
  disabled?: boolean;
}

export function CheckboxField(props: Props & UseFieldConfig<string>) {
  const { input, meta } = useField(props.name, { ...props, type: 'checkbox' });

  return (
    <div className="col-xs-12">
      <Checkbox {...props} {...input} />
      <Error meta={meta} />
    </div>
  );
}

export default function Checkbox(props: FinalFieldProps<Props, string>) {
  const { className, label, title, disabled } = props;

  const inputProps = omit(props, ['className']);
  const classes = classNames('input-group', className);

  return (
    <div className={classes}>
      {title ? <div className="formcheckbox-label">{title}</div> : null}
      <label>
        <input {...inputProps} disabled={disabled ? disabled : false} />
        <span>{label}</span>
      </label>
    </div>
  );
}
