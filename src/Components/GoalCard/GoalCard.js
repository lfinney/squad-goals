import React from 'react';
import PropTypes from 'prop-types';

const GoalCard = ({ goal }) => {
  return (
    <tr className="goal-row">
      <td>{goal.title}</td>
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
