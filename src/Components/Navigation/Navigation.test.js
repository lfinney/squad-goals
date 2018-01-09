import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
// import goal from '../../../data/test/goals_data_test';

describe('Navigation snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper).toMatchSnapshot();
  });


  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<Navigation />, div);
  // });
});
