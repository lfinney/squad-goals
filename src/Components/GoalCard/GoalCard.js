import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const GoalCard = ({ goal, leaveGroup, userId }) => {
  return (
    <tr className="goal-row">
      <td>
        <Link to={{
          pathname: `/Goal/${goal.id}`,
          state: { userId },
        }}
        >
          {goal.title}
        </Link>
      </td>
      <td>{goal.goal_time}</td>
      <td>{goal.goal_points}</td>
      <td>
        <input
          onClick={() => leaveGroup('users', userId, 'goals', goal.id)}
          type="button"
          value="Leave"
        />
      </td>
    </tr>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default GoalCard;
