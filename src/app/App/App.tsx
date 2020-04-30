import React from 'react';
import { Alert, Button, Jumbotron } from 'reactstrap';
import logo from '../../styles/logo.svg';
import { ConfirmModal, Page } from '../../ui';
import './_app.css';

export default function App() {
  return (
    <Page>
      <Jumbotron>
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
      </Jumbotron>
      <div id="main">
        <div className="content">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
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
