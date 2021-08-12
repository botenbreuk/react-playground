import { isEmpty } from 'lodash';
import { ReactNode } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';
import { Error } from '..';
import { InfoPopup } from '../../index';
import { FinalFieldProps } from '../types';

interface Props {
  label: string | ReactNode;
  name: string;
  disabled?: boolean;
  hasEmptyOption?: boolean;
  infoPopupText?: string | null;
}

export default function JaNeeSelectField(
  props: Props & UseFieldConfig<string | boolean>
) {
  const { input, meta } = useField(props.name, { ...props });

  return (
    <>
      <JaNeeSelect {...props} {...input} />
      <Error meta={meta} />
    </>
  );
}

export function JaNeeSelect(props: FinalFieldProps<Props, string | boolean>) {
  const {
    value,
    onChange,
    label,
    name,
    disabled,
    hasEmptyOption = false,
    infoPopupText
  } = props;

  return (
    <div className="form-group col-xs-12 mb-2">
      <label>{label}</label>
      {infoPopupText && <InfoPopup>{infoPopupText}</InfoPopup>}
      <div className="ja-nee-field row">
        <div className="col-xs-4">
          <label>
            <input
              name={name}
              type="radio"
              value="ja"
              checked={value === 'ja'}
              onChange={() => onChange('ja')}
              disabled={disabled}
            />
            Ja
          </label>
        </div>
        <div className="col-xs-4">
          <label>
            <input
              name={name}
              type="radio"
              value="nee"
              checked={value === 'nee'}
              onChange={() => onChange('nee')}
              disabled={disabled}
            />
            Nee
          </label>
        </div>
        {hasEmptyOption ? (
          <div className="col-xs-4">
            <label>
              <input
                name={name}
                type="radio"
                value=""
                checked={isEmpty(value)}
                onChange={() => onChange('')}
                disabled={disabled}
              />
              Onbeantwoord
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}
