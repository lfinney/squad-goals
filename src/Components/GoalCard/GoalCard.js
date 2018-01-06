import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GoalCard = ({ goal }) => {
  return (
    <tr className="goal-row">
      <td>
        <Link to={{
          pathname: `/Goal/${goal.id}`,
          state: { goal },
        }}
        >
          {goal.title}
        </Link>
      </td>
      <td>{goal.goal_time}</td>
      <td>{goal.goal_points}</td>
      <td><input type="button" value="Leave" /></td>
    </tr>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
};

export default GoalCard;
