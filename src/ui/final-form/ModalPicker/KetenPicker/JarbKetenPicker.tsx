import { useField, UseFieldConfig } from 'react-final-form';
import { Error, FieldError } from '../../';
import Keten, { KetenResult } from '../../../../app/Keten/Keten';
import useJarbField, {
  JarbFieldInputProps
} from '../../../../hooks/useJarbField/useJarbField';
import JarbModalPickerMulti, {
  ModalPickerMultiple
} from '../ModalPickerMultiple';

interface Props {
  id: string;
  name: string;
  label: string;
  returnData?: (value: KetenResult[]) => void;
}

export default function JarbKetenPicker(
  props: Props & JarbFieldInputProps<KetenResult[]>
) {
  const { input, meta } = useJarbField({ ...props });

  return (
    <>
      <JarbModalPickerMulti<KetenResult>
        placeholder="Selecteer keten"
        canSearch={false}
        optionForValue={keten => keten.naam}
        fetchOptions={(query, page, size) =>
          Keten.page({ page, size, sort: 'naam,asc' })
        }
        emptyMessage="Kies keten"
        {...props}
        {...input}
      />
      <Error meta={meta} />
      <div className="xs-mt-5">
        <FieldError fieldName={props.jarb.validator} />
      </div>
    </>
  );
}

export function KetenPicker(props: Props & UseFieldConfig<KetenResult[]>) {
  const { input, meta } = useField<KetenResult[]>(props.name, { ...props });

  return (
    <>
      <ModalPickerMultiple<KetenResult>
        placeholder="Selecteer keten"
        canSearch={false}
        optionForValue={keten => keten.naam}
        fetchOptions={(query, page, size) =>
          Keten.page({ page, size, sort: 'naam,asc' })
        }
        emptyMessage="Kies keten"
        {...props}
        {...input}
      />
      <div className="col-xs-12">
        <Error meta={meta} />
      </div>
    </>
  );
}
