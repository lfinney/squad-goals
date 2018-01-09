import React from 'react';
import PropTypes from 'prop-types';


const GoalCard = ({ goal, leaveGroup, userId }) => {
  console.log(goal);
  return (
    <div className="goal-row">
      <h3>
        <a href={{
          pathname: `/Goal/${goal.id}`,
          state: { userId },
        }}
        >
          {goal.title}
        </a>
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
