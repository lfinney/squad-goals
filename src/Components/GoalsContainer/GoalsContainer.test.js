import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import GoalsContainer from './GoalsContainer';
import goalData from '../../../data/test/goals_data_test';

describe('GoalsContainer snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<GoalsContainer
      goalData={goalData}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><GoalsContainer goalData={goalData} /></BrowserRouter>, div);
  });
});
