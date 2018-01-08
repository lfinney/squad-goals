/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import GoalsContainer from './GoalsContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoalsContainer />, div);
});
