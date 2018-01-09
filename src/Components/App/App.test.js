import { shallow } from 'enzyme';
import React from 'react';
import MainApp from './App.js';

describe('MainApp snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<MainApp />);

    expect(wrapper).toMatchSnapshot();
  });
});
