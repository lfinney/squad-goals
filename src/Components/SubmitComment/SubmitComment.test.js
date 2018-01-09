import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import SubmitComment from './SubmitComment';

describe('SubmitComment snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<SubmitComment />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubmitComment />, div);
  });
});
