import { Alert, Button } from 'reactstrap';
import { ConfirmModal, Page } from '../../ui';
import Logo from '../../ui/Logo/Logo';

export default function App() {
  return (
    <Page>
      <div className="container-fluid text-sm-center p-5 bg-light">
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <Button color="primary">Learn More</Button>
        </p>
      </div>
      <div id="main">
        <div>
          <header className="app-header">
            <Logo className="app-logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <Alert color="primary">
              This is a primary alert — check it out!
            </Alert>
            <ConfirmModal buttonLabel="Test" />
          </header>
        </div>
      </div>
    </Page>
  );
}
