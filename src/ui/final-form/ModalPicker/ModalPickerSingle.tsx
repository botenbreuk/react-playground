import { emptyPage, Page } from '@42.nl/spring-connect';
import { debounce } from 'lodash';
import { Component, ReactNode } from 'react';
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

  name?: string;
  emptyMessage: string;
  buttonLabel: string;
  popUpMessage?: string;
}

type ModalPickerSingleProps<T> = FinalFieldProps<Props<T>, T>;

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

export class ModalPickerSingle<T> extends Component<
  ModalPickerSingleProps<T>,
  ModalPickerSingleState<T>
> {
  state: ModalPickerSingleState<T> = {
    modalOpen: false,
    page: emptyPage<T>(),
    selected: undefined,
    query: '',
    userHasSearched: false
  };

  constructor(props: ModalPickerSingleProps<T>) {
    super(props);
    this.debouncedSearch = debounce(this.debouncedSearch, 500);
  }

  componentDidMount() {
    this.loadPage(1);
  }

  modalSaved() {
    this.setState({ modalOpen: false });

    const selected = this.state.selected;

    /*
      The button can only be clicked when something is selected,
    */
    if (selected) {
      this.props.onChange(selected);
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal() {
    const selected = this.props.value;

    this.setState({ selected, modalOpen: true, query: '' }, () => {
      this.loadPage(1);
    });
  }

  itemClicked(selected: T) {
    this.setState({ selected });
  }

  fetchOptions(query: string) {
    this.debouncedSearch(query);
  }

  async loadPage(pageNumber: number) {
    const query = this.state.query;

    this.setState({ userHasSearched: query !== '' });

    const page: Page<T> = await this.props.fetchOptions(query, pageNumber, 10);

    this.setState({ page });
  }

  debouncedSearch(query: string) {
    this.setState({ query }, () => {
      this.loadPage(1);
    });
  }

  render() {
    const { label, canSearch, popUpMessage } = this.props;

    const error = this.props.error;
    const page = this.state.page;

    return (
      <div className="form-group">
        <label>{label}</label>
        {popUpMessage ? <InfoPopup>{popUpMessage}</InfoPopup> : null}

        {this.renderSelected()}
        {error}

        <Modal
          open={this.state.modalOpen}
          title="Selecteer"
          primary="Selecteren"
          primaryClicked={() => this.modalSaved()}
          close="Annuleren"
          closeClicked={() => this.closeModal()}
          footer={
            <Pager
              page={page}
              onChange={pageNumber => this.loadPage(pageNumber)}
            />
          }
          searchable={canSearch !== undefined ? canSearch : true}
          onSearch={query => this.debouncedSearch(query)}
        >
          <div className="row">
            <div className="col-md-12">{this.renderModalContent()}</div>
          </div>
        </Modal>
      </div>
    );
  }

  renderSelected() {
    const selected = this.props.value;
    const { optionForValue } = this.props;

    if (selected === undefined) {
      return (
        <p>
          <button
            type="button"
            role="link"
            className="btn btn-link p-0 m-0"
            style={{ fontWeight: 'normal' }}
            onClick={() => this.openModal()}
          >
            {this.props.emptyMessage}
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
            onClick={() => this.openModal()}
          >
            {this.props.buttonLabel}
          </button>
        </p>
      );
    }
  }

  renderModalContent() {
    const { page, selected } = this.state;
    if (page.totalElements === 0) {
      return <p>Geen resultaten gevonden</p>;
    }

    const content = page.content.map((value: any) => {
      const { optionForValue } = this.props;
      const label = optionForValue(value);

      const isChecked =
        selected !== undefined && optionForValue(selected) === label;

      return (
        <li key={optionForValue(value)}>
          <div className="checkbox">
            <label>
              <input
                type="radio"
                checked={isChecked}
                onChange={() => this.itemClicked(value)}
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
