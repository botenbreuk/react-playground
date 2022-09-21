import { emptyPage, Page } from '@42.nl/spring-connect';
import classNames from 'classnames';
import { debounce, isArray, isEqual } from 'lodash';
import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Col, Row } from 'react-bootstrap';
import { Error } from '../';
import { Modal, Pager } from '../..';
import useJarbField, {
  JarbFieldInputProps
} from '../../../hooks/useJarbField/useJarbField';
import Button from '../../Button/Button';
import { FinalFieldProps } from '../types';
import { FetchOptionsCallback, OptionForValue } from './types';

export interface ChildrenField<T> {
  checkbox: ReactNode;
  value: T;
  selectClick: () => void;
}

interface Props<T> {
  /**
   * The id of the form element.
   */
  id: string;

  /**
   * The label of the form element.
   */
  label?: string;

  /**
   * The placeholder of the form element.
   */
  placeholder?: string;

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
   * Optional label for the button.
   * If this is specified it will use this label for the button else it wil use the label.
   */
  buttonLabel?: string;

  name: string;
  emptyMessage: string;
  returnData?: (value: T[]) => void;

  /**
   * Option for hiding all selected values
   * Default is false and shows labels for all selected values.
   */
  hideLabels?: boolean;

  hideSelected?: boolean;
  disableSelected?: boolean;

  /**
   * Option for showing the label as a button instead of a link.
   * Default is false and shows a link
   */
  labelAsButton?: boolean;

  /**
   * Component for a reset of the list
   */
  resetComponent?: ReactNode;

  /**
   * Optional row key to distinguish rows from each other.
   * Defaults to optionForValue.
   */
  rowKey?: (value: T) => any;

  children?: (value: ChildrenField<T>[]) => ReactNode;

  buttonClass?: string;
}

export default function JarbModalPickerMulti<T>(
  props: Props<T> & JarbFieldInputProps<T[]>
) {
  const { input, meta } = useJarbField({ ...props });

  return (
    <>
      <ModalPickerMultiple {...props} {...input} />
      {meta ? <Error meta={meta} /> : null}
    </>
  );
}

export function ModalPickerMultiple<T>(props: FinalFieldProps<Props<T>, T[]>) {
  const {
    label,
    canSearch = false,
    hideLabels = false,
    hideSelected = false,
    disableSelected = false,
    labelAsButton = false,
    optionForValue,
    fetchOptions,
    value: values,
    buttonClass,
    rowKey
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(emptyPage<T>());
  const [selected, setSelected] = useState<T[]>([]);
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

    if (props.returnData) {
      props.returnData(selected);
    }
    props.onChange([...selected]);
    if (props.onBlur) {
      props.onBlur();
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    // Always copy the `value` so the `selected` is a fresh array.
    // Otherwise the selection will be the same as the value, which
    // causes values to be commited and the cancel button will not
    // do anything.
    const newSelected = isArray(props.value) ? [...props.value] : [];
    setSelected(newSelected);
    setIsOpen(true);
    setQuery('');
  }

  function itemClicked(item: T, isChecked: boolean) {
    let newSelected: T[] = [...selected];

    if (isChecked) {
      newSelected = selected.filter((v: T) => {
        if (item instanceof Object && v instanceof Object) {
          return !isEqual(JSON.stringify(item), JSON.stringify(v));
        }
        return v !== item;
      });
    } else {
      newSelected.push(item);
    }

    setSelected(newSelected);
  }

  function onSearch(query: string) {
    setQuery(query);
  }

  const debouncedSearch = debounce(onSearch, 500);

  return (
    <div className="form-group">
      {label ? (
        <p className="p-0 m-0">
          <label>{label}</label>
        </p>
      ) : null}

      {renderModalCurrentSelection()}

      <Modal
        className={props.className}
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
          <div className="col-md-12">
            {props.children ? renderModalChildren() : renderModalContent()}
          </div>
        </div>
      </Modal>
    </div>
  );

  function renderModalCurrentSelection() {
    const className = classNames(
      'btn m-0',
      {
        'btn-primary': labelAsButton && !buttonClass,
        'btn-link p-0': !labelAsButton && !buttonClass
      },
      buttonClass
    );
    const style: CSSProperties = !labelAsButton ? { fontWeight: 'normal' } : {};

    const btn = (
      <Button
        role="link"
        className={className}
        buttonStyle={style}
        onClick={openModal}
        casing={!labelAsButton ? 'keep-text' : 'uppercase'}
      >
        <span>
          {props.buttonLabel ? props.buttonLabel : props.emptyMessage}
        </span>
      </Button>
    );

    if (!values || values.length === 0) {
      return <>{btn}</>;
    }

    return (
      <>
        {renderLabels(values)}
        <Row>
          <Col md={6}>{btn}</Col>
          <Col md={6}>{props.resetComponent}</Col>
        </Row>
      </>
    );
  }

  function renderModalChildren() {
    const content: ChildrenField<T>[] = page.content.map(value => {
      const label = optionForValue(value);

      const isChecked = selected.some(
        selected => optionForValue(selected) === label
      );

      let initialSelected;
      if (isArray(props.value)) {
        initialSelected = props.value?.some(v => optionForValue(v) === label);
      }

      const checkbox = (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => itemClicked(value, isChecked)}
          disabled={disableSelected && initialSelected}
        />
      );

      return {
        checkbox,
        value,
        selectClick: () => itemClicked(value, isChecked)
      };
    });

    return <>{props.children ? props.children(content) : null}</>;
  }

  function renderModalContent() {
    if (page.totalElements === 0) {
      return <p>Geen resultaten gevonden</p>;
    }

    const content = page.content.map(value => {
      const label = optionForValue(value);

      const isChecked = selected.some(
        selected => optionForValue(selected) === label
      );

      let initialSelected;
      if (isArray(props.value)) {
        initialSelected = props.value?.some(v => optionForValue(v) === label);
      }

      if (hideSelected && initialSelected) {
        return null;
      }

      return (
        <li key={rowKey ? rowKey(value) : optionForValue(value)}>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => itemClicked(value, isChecked)}
                disabled={disableSelected && initialSelected}
              />
              {label}
            </label>
          </div>
        </li>
      );
    });

    return (
      <div>
        {renderLabels(selected)}
        <ul className="list-unstyled">{content}</ul>
      </div>
    );
  }

  function renderLabels(values: T[]) {
    if (!values || hideLabels) {
      return null;
    }

    return values.map(value => {
      const label = optionForValue(value);
      return (
        <span key={label} className="label label-default-dark xs-mr-5">
          {label}
        </span>
      );
    });
  }
}
