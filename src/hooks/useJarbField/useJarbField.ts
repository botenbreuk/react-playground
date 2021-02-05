import { JarbProps } from '@42.nl/jarb-final-form';
import { clearErrorsForValidator } from '@42.nl/react-error-store';
import { FieldValidator } from 'final-form';
import { useMemo } from 'react';
import { useField, UseFieldConfig } from 'react-final-form';
import { getEnhancedValidate } from './jarbValidators';

export type JarbFieldInputProps<FieldValue> = JarbFieldOptions<FieldValue> & {
  // Name for the field errors from the backend like Melding.naam.
  fieldName?: string;
};
export interface JarbFieldOptions<FieldValue>
  extends Omit<UseFieldConfig<FieldValue>, 'validate'> {
  name: string;
  jarb: JarbProps;
  validators?: FieldValidator<FieldValue>[];
}

export default function useJarbField<FieldValue>(
  options: JarbFieldOptions<FieldValue>
) {
  const { name, jarb } = options;
  const validate = useMemo(() => {
    return getEnhancedValidate<FieldValue>({
      ...options
    });
  }, [options]);

  const fieldProps = useField<FieldValue>(name, {
    ...options,
    validate
  });
  const onChange = fieldProps.input.onChange;
  fieldProps.input.onChange = (value: FieldValue) => {
    onChange(value);
    clearErrorsForValidator(jarb.validator || '');
  };
  return fieldProps;
}
