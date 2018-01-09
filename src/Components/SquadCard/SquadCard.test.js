/* eslint-disable */
import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import SquadCard from './SquadCard';
import squad from '../../../data/test/squad_data_test';

describe('SquadCard snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<SquadCard
      squad={squad}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  // it('renders without crashing', () => {
  //   const div = document.createElement('div');
  //   ReactDOM.render(<SquadCard
  //     squad={squad}
  //   />, div);
  // });
});
