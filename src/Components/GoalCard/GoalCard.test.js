import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GoalCard from './GoalCard';
import goal from '../../../data/test/goals_data_test';

describe('GoalCard snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<GoalCard
      goal={goal[0]}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><GoalCard goal={goal[0]} /></BrowserRouter>, div);
  });
});
