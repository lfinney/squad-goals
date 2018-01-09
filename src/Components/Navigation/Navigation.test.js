import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><Navigation /></BrowserRouter>, div);
  });
});
