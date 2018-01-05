/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';
import ChallengesContainer from './ChallengesContainer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChallengesContainer />, div);
});
