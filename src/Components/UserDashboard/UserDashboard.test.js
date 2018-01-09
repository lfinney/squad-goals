import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserDashboard from './UserDashboard';

describe('UserDashboard snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<UserDashboard />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><UserDashboard /></BrowserRouter>, div);
  });
});
