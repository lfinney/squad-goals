import { shallow } from 'enzyme';
import React from 'react';
import GoalDashboard from './GoalDashboard';

describe('GoalDashboard snapshot', () => {
  const goal = {
    conversation: [],
    conversation_id: 24,
    id: 18,
    squad_name: 'Jm Squad Squad',
    users: [{}],
  };

  it('should always match the snapshot', () => {
    const wrapper = shallow(<GoalDashboard
      squad={goal}
      location={{ state: { userId: 1 } }}
      match={{ params: { id: 1 } }}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});
