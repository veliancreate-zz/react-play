import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import './App.css';

import WorkerCardContainer from './workerCard/WorkerCardContainer';

const App = ({ store }) => (
  <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <h1>ROTA</h1>
      </header>
      <WorkerCardContainer />
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
