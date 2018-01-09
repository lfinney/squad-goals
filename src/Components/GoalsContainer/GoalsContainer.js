import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from '../GoalCard/GoalCard';

const GoalsContainer = ({ goalData, leaveGroup, userId }) => {
  const goalInfo = goalData.map((goal) => {
    return (
      <GoalCard
        leaveGroup={leaveGroup}
        userId={userId}
        goal={goal}
        key={`goal-${goal.id}`}
      />
    );
  });

  return (
    <div className="goal-body">
      <h2 className="goal-body-title">Goals</h2>
      <div className="goal-body-info">
        <div className="goal-row">
          <h3 className="row-header">Goal Title</h3>
          <h3 className="row-header">Goal Time </h3>
          <h3 className="row-header">Goal Points </h3>
        </div>
        { goalInfo }
      </div>
    </div>
  );
};

GoalsContainer.propTypes = {
  goalData: PropTypes.arrayOf(PropTypes.object),
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default GoalsContainer;
