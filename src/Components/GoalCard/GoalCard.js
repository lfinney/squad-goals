import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';


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
  goal: PropTypes.array,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default GoalCard;
