import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SquadsContainer from './SquadsContainer';

describe('SquadsContainer snapshot', () => {
  const squad = [{
    conversation_id: 15,
    created_at: '2018-01-08',
    id: 9,
    squad_name: 'El Squadro',
    updated_at: '2018-01-08T20:56:36.8072',
  }];

  it('should always match the snapshot', () => {
    const wrapper = shallow(<SquadsContainer
      squadData={squad}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><SquadsContainer squadData={squad} /></BrowserRouter>, div);
  });
});
