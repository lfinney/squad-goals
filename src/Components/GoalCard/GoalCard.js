import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GoalCard = ({ goal, leaveGroup, userId }) => {
  return (
    <div className="goal-row">
      <h3>
        <Link to={{
          pathname: `/Goal/${goal.id}`,
          state: { userId },
        }}
        >
          {goal.title}
        </Link>
      </h3>
      <h3>{goal.goal_time}</h3>
      <h3>{goal.goal_points}</h3>
    </div>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.object,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default GoalCard;
