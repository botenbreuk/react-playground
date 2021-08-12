import { useField, UseFieldConfig } from 'react-final-form';
import { Error, FieldError } from '../../';
import Keten from '../../../../app/Keten/Keten';
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
  returnData?: (value: Keten[]) => void;
}

export default function JarbKetenPicker(
  props: Props & JarbFieldInputProps<Keten[]>
) {
  const { input, meta } = useJarbField({ ...props });

  return (
    <>
      <JarbModalPickerMulti<Keten>
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

export function KetenPicker(props: Props & UseFieldConfig<Keten[]>) {
  const { input, meta } = useField<Keten[]>(props.name, { ...props });

  return (
    <>
      <ModalPickerMultiple<Keten>
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
