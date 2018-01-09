/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Welcome /></BrowserRouter>, div);
});
