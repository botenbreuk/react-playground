import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Page } from '../../ui';
import App from '../App/App';
import Dnd from '../Dnd/Dnd';
import DndExample from '../DndExample/DndExample';
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
        <Route exact path="/dnd">
          <Dnd />
        </Route>
        <Route exact path="/dnd-sort">
          <DndExample />
        </Route>
        <Route path="/about">
          <Page />
        </Route>
      </Switch>
    </Router>
  );
}
