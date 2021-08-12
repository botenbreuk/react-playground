import Dropzone from 'react-dropzone';
import { FieldMetaState, useField, UseFieldConfig } from 'react-final-form';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import Error from '../Error/Error';
import FieldError from '../FieldError/FieldError';
import { FinalFieldProps } from '../types';

export type DropzoneFile = File & { preview: string };

interface Props {
  label: string;
  name: string;
  meta?: FieldMetaState<any>;
  fieldName?: string;
}

export default function JarbBestandUpload(
  props: Props & JarbFieldInputProps<DropzoneFile>
) {
  const { input, meta } = useJarbField({ ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <BestandUpload {...props} {...input} />
      <div className="xs-mt-5">
        <Error meta={meta} />
        <FieldError fieldName={props.jarb.validator} />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function BestandUploadField(
  props: Props & UseFieldConfig<DropzoneFile>
) {
  const { input, meta } = useField(props.name, { ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <BestandUpload {...props} {...input} />
      <div className="xs-mt-5">
        <Error meta={meta} />
        <FieldError fieldName="Multipart.bestand" />
        <FieldError fieldName={fieldName} />
      </div>
    </>
  );
}

export function BestandUpload(props: FinalFieldProps<Props, DropzoneFile>) {
  const { label, value, onChange, meta } = props;
  const spanClass = meta?.invalid && meta?.touched ? 'error' : '';

  function onDrop(files: File[]) {
    onChange(files[0]);
  }

  function removeBestand() {
    onChange(null);
  }

  return <div>{!value ? renderDropzone() : renderBestand(value)}</div>;

  function renderDropzone() {
    return (
      <div className="row">
        <div className="col-md-12">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps({
                    className: 'dropzone',
                    onDrop: event => event.stopPropagation()
                  })}
                >
                  <input {...getInputProps()} />
                  <span className={spanClass} style={{ cursor: 'default' }}>
                    {label}
                  </span>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }

  function renderBestand(file: DropzoneFile) {
    return (
      <div className="row bijlage-lijst">
        <div className="col-xs-8 col-md-10">{file.name}</div>
        <div className="col-xs-4 col-md-2">
          <button
            type="button"
            role="link"
            className="btn btn-link p-0 m-0"
            style={{ fontWeight: 'normal' }}
            onClick={removeBestand}
          >
            verwijder
          </button>
        </div>
      </div>
    );
  }
}
