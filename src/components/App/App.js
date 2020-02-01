import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import Navigation from './Navigation';
import PageContainer from '../../containers/PageContainer';

const App = () => (
  <Router>
    <Provider store={store}>
      <Navigation />
      <main className="main" role="main">
        <Switch>
          <Route path="/:slug?/" component={PageContainer} />
        </Switch>
      </main>
    </Provider>
  </Router>
);

export default App;
