import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CreateGoals from './CreateGoals';
import goalData from '../../../data/test/goals_data_test';

describe('MainApp snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<CreateGoals />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    // const div = document.createElement('div');
    // ReactDOM.render(<CreateGoals />, div);

    // expect(renderer.create(<Router><CreateGoals goalData={goalData} /></Router>)
    //   .toJSON())
    //   .toEqual(<CreateGoals goalData={goalData} />);
  });
});
