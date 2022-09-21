import { Field, UseFieldConfig } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { Error } from '../';
import { useEnumWaarde } from '../../../enum/utils';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import { FinalFieldProps } from '../types';
import { Select } from './Select';

interface Props {
  id: string;
  name: string;
  label?: string;
  className?: string;
  inline?: boolean;
  enumName: string;
  hasEmptyOption?: boolean;
  emptyOptionText?: string;
  multiple?: boolean;
  infoPopupText?: string;
  excludedValues?: string[];
  disabled?: boolean;
}

export default function JarbEnumSelect(
  props: Props & JarbFieldInputProps<string>
) {
  const { input, meta } = useJarbField({ ...props });
  return (
    <>
      <EnumSelect {...props} {...input} />
      <Error meta={meta} />
    </>
  );
}

export function EnumSelectField(props: Props & UseFieldConfig<string>) {
  return (
    <Field {...props}>
      {({ input, meta }) => (
        <>
          <EnumSelect {...props} {...input} />
          <Error meta={meta} />
        </>
      )}
    </Field>
  );
}

export function EnumSelect(props: FinalFieldProps<Props, string>) {
  const {
    name,
    className,
    id,
    value,
    onChange,
    onBlur,
    label = '',
    inline,
    hasEmptyOption,
    emptyOptionText,
    multiple,
    infoPopupText,
    excludedValues = [],
    disabled,
    enumName
  } = props;

  const formSelectProps = {
    id,
    name,
    value,
    onChange,
    onBlur,
    className,
    label,
    inline,
    hasEmptyOption,
    emptyOptionText,
    multiple,
    infoPopupText,
    disabled
  };

  const options = useEnumWaarde(enumName);
  const { t } = useTranslation('enums');

  return (
    <Select {...formSelectProps}>
      {options
        .filter(enm => !excludedValues.includes(enm.naam))
        .map(enm => (
          <option key={enm.naam} value={enm.naam}>
            {t(`${enumName}.${enm.naam}`, enm.naam)}
          </option>
        ))}
    </Select>
  );
}
