import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './Welcome';

describe('Welcome snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Welcome />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Welcome /></BrowserRouter>, div);
  });
});
