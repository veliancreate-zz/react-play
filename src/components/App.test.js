import React from 'react';
import configureStore from 'redux-mock-store';
import ReactDOM from 'react-dom';
import App from './App';
import initialState from '../initialState';

it('renders without crashing', () => {
  const store = configureStore()(initialState);
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
});
