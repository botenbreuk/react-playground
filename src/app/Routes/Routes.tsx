import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App/App';
import { Page } from '../../ui';
import ShuffleList from '../Shuffle/ShuffleList';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/shuffle">
          <ShuffleList />
        </Route>
        <Route path="/about">
          <Page />
        </Route>
      </Switch>
    </Router>
  );
}
