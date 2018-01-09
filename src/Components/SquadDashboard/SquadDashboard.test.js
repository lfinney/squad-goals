import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import SquadDashboard from './SquadDashboard';

describe('SquadDashboard snapshot', () => {
  const squad = {
    conversation: [],
    conversation_id: 24,
    id: 18,
    squad_name: 'Jm Squad Squad',
    users: [{}],
  };

  it('should always match the snapshot', () => {
    const wrapper = shallow(<SquadDashboard
      squad={squad}
      location={{ state: { userId: 1 } }}
      match={{ params: { id: 1 } }}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
