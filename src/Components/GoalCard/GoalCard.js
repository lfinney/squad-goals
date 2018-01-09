import React from 'react';
import PropTypes from 'prop-types';


const GoalCard = ({ goal, leaveGroup, userId }) => {
  return (
    <tr className="goal-row">
      <td>
        <a href={{
          pathname: `/Goal/${goal.id}`,
          state: { userId },
        }}
        >
          {goal.title}
        </a>
      </td>
      <td>{goal.goal_time}</td>
      <td>{goal.goal_points}</td>
    </tr>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default GoalCard;
