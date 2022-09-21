import arrayMutators from 'final-form-arrays';
import { Children, ReactNode, useState } from 'react';
import { Form } from 'react-final-form';
import { Panel, PanelBody, PanelHeading, ProgressStepper } from '../../';
import { PanelHeadingIconBgColor } from '../../Panel/PanelHeading/PanelHeading';
import { ProgressStep } from './ProgressStepper/ProgressStepper';
import { getChildren } from './utils';

interface Props<T extends Partial<any>> {
  initialValues?: T;
  onSubmit: (form: T) => void;
  onCancel: () => void;
  children: ReactNode | ReactNode[];
  panelTitle: (values: T) => string;
  panelIcon?: string;
  panelIconColor: (values: T) => PanelHeadingIconBgColor;
}

export default function Wizard<T extends Partial<any>>(props: Props<T>) {
  const {
    initialValues,
    children,
    onSubmit,
    onCancel,
    panelTitle,
    panelIcon,
    panelIconColor
  } = props;
  const [page, setPage] = useState(0);
  const [values, setValues] = useState<T>(initialValues || ({} as T));

  const activePage = getChildren(children)[page];
  const isLastPage = page === Children.count(children) - 1;
  const isFirstPage = page === 0;

  function next(values: T) {
    setPage(page => Math.min(page + 1, Children.toArray(children).length - 1));
    setValues(values);
  }

  function previous() {
    setPage(page => Math.max(page - 1, 0));
  }

  function handleSubmit(values: T) {
    const isLastPage = page === Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      next(values);
    }
  }

  function validate(values: T) {
    return activePage.props.validate ? activePage.props.validate(values) : {};
  }

  function getSteps(): ProgressStep[] {
    return getChildren(children).map((child, index) => ({
      title: child.props.title,
      step: index
    }));
  }

  return (
    <Form
      validate={validate}
      initialValues={values}
      onSubmit={handleSubmit}
      mutators={{
        // potentially other mutators could be merged here
        ...arrayMutators
      }}
    >
      {({ handleSubmit, submitting, values }) => (
        <Panel type="dark">
          <PanelHeading
            title={panelTitle(values)}
            iconBgColor={panelIconColor(values)}
            icon={panelIcon}
          />
          <PanelBody>
            <ProgressStepper
              steps={getSteps()}
              currentStep={page}
              onClick={obj => setPage(obj.step)}
            />
            <form onSubmit={handleSubmit}>
              <>
                {activePage}
                <div className="col-xs-12">
                  {page > 0 && (
                    <button
                      id="vorige"
                      type="button"
                      onClick={previous}
                      className="btn btn-default text-uppercase"
                    >
                      Vorige
                    </button>
                  )}
                  {isFirstPage && (
                    <button
                      type="button"
                      onClick={onCancel}
                      className="btn btn-link text-uppercase"
                    >
                      Annuleren
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary text-uppercase pull-right"
                    disabled={isLastPage && submitting}
                  >
                    {!isLastPage ? 'Volgende' : 'Opslaan'}
                  </button>
                </div>
              </>
            </form>
          </PanelBody>
        </Panel>
      )}
    </Form>
  );
}
