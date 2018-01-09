import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import CreateSquads from './CreateSquads';

describe('MainApp snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<CreateSquads />);

    expect(wrapper).toMatchSnapshot();
  });


  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<CreateSquads />, div);
  // });
});
