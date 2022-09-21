import { emptyPage, Page } from '@42.nl/spring-connect';
import { debounce } from 'lodash';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { FieldError } from '..';
import { InfoPopup, Modal, Pager } from '../../';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import Error from '../Error/Error';
import { FinalFieldProps } from '../types';
import { FetchOptionsCallback, OptionForValue } from './types';

interface Props<T> {
  /**
   * The id of the form element.
   */
  id: string;

  /**
   * The label of the form element.
   */
  label: string;

  /**
   * The placeholder of the form element.
   */
  placeholder: string;

  /**
   * Optionally whether or not the user can search.
   * Defaults to `true`.
   */
  canSearch?: boolean;

  /**
   * Callback to fetch the options to display to the user.
   */
  fetchOptions: FetchOptionsCallback<T>;

  /**
   * Callback to convert an value of type T to an option to show
   * to the user.
   */
  optionForValue: OptionForValue<T>;

  /**
   * Optionally the error message to render.
   */
  error?: ReactNode;

  /**
   * Optional extra CSS class you want to add to the component.
   * Useful for styling the component.
   */
  className?: string;

  /**
   * Optional row key to distinguish rows from each other.
   * Defaults to optionForValue.
   */
  rowKey?: (value: T) => any;

  name?: string;
  emptyMessage: string;
  buttonLabel: string;
  popUpMessage?: string;
}

export interface ModalPickerSingleState<T> {
  modalOpen: boolean;
  page: Page<T>;
  selected?: T;
  query: string;
  userHasSearched: boolean;
}

export default function JarbModalPickerSingle<T>(
  props: Props<T> & JarbFieldInputProps<T>
) {
  const { input, meta } = useJarbField({ ...props });
  const { fieldName = '' } = props;

  return (
    <>
      <ModalPickerSingle {...props} {...input} />
      <Error meta={meta} />
      <FieldError fieldName={fieldName} />
    </>
  );
}

export function ModalPickerSingle<T>(props: FinalFieldProps<Props<T>, T>) {
  const {
    label,
    canSearch = false,
    popUpMessage,
    emptyMessage,
    optionForValue,
    fetchOptions,
    value,
    error,
    buttonLabel,
    rowKey
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(emptyPage<T>());
  const [selected, setSelected] = useState<T>(value);
  const [query, setQuery] = useState('');

  const loadPage = useCallback(
    async (pageNumber: number) => {
      const pageItems: Page<T> = await fetchOptions(query, pageNumber, 10);
      setPage(pageItems);
    },
    [fetchOptions, query]
  );

  useEffect(() => {
    loadPage(1);
  }, [loadPage]);

  function modalSaved() {
    setIsOpen(false);

    if (selected) {
      props.onChange(selected);
    }
    if (props.onBlur) {
      props.onBlur();
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    const newSelected = value;
    setSelected(newSelected);
    setIsOpen(true);
    setQuery('');
  }

  function itemClicked(selected: T) {
    setSelected(selected);
  }

  function onSearch(query: string) {
    setQuery(query);
  }

  const debouncedSearch = debounce(onSearch, 500);

  return (
    <div className="form-group">
      <label>{label}</label>
      {popUpMessage ? <InfoPopup>{popUpMessage}</InfoPopup> : null}

      {renderSelected()}
      {error}

      <Modal
        open={isOpen}
        title="Selecteer"
        primary="Selecteren"
        primaryClicked={modalSaved}
        close="Annuleren"
        closeClicked={closeModal}
        footer={<Pager page={page} onChange={loadPage} />}
        searchable={canSearch}
        onSearch={debouncedSearch}
      >
        <div className="row">
          <div className="col-md-12">{renderModalContent()}</div>
        </div>
      </Modal>
    </div>
  );

  function renderSelected() {
    if (selected === undefined) {
      return (
        <p>
          <button
            type="button"
            role="link"
            className="btn btn-link p-0 m-0"
            style={{ fontWeight: 'normal' }}
            onClick={openModal}
          >
            {emptyMessage}
          </button>
        </p>
      );
    } else {
      return (
        <p>
          <span className="label label-default-dark xs-mr-5">
            {optionForValue(selected)}
          </span>
          <button
            type="button"
            role="link"
            className="btn btn-link p-0 m-0"
            style={{ fontWeight: 'normal' }}
            onClick={openModal}
          >
            {buttonLabel}
          </button>
        </p>
      );
    }
  }

  function renderModalContent() {
    if (page.totalElements === 0) {
      return <p>Geen resultaten gevonden</p>;
    }

    const content = page.content.map(value => {
      const label = optionForValue(value);

      const isChecked =
        selected !== undefined && optionForValue(selected) === label;

      return (
        <li key={rowKey ? rowKey(value) : optionForValue(value)}>
          <div className="checkbox">
            <label>
              <input
                type="radio"
                checked={isChecked}
                onChange={() => itemClicked(value)}
              />
              {label}
            </label>
          </div>
        </li>
      );
    });
    return <ul className="list-unstyled">{content}</ul>;
  }
}
