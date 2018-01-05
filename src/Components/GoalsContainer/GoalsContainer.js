import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from '../GoalCard/GoalCard';

const GoalsContainer = ({ goalData }) => {
  const goalInfo = goalData.map((goal) => {
    return (
      <GoalCard
        goal={goal}
        key={`goal-${goal.id}`}
      />
    );
  });

  return (
    <div className="goal-body">
      <h2 className="goal-body-title">Goals</h2>
      <table className="goal-body-info">
        <tbody>
          <tr className="goal-row">
            <th>Goal Title</th>
            <th>Goal Time </th>
            <th>Goal Points </th>
            <th />
          </tr>
          { goalInfo }
        </tbody>
      </table>
    </div>
  );
};

GoalsContainer.propTypes = {
  goalData: PropTypes.arrayOf(PropTypes.object),
};

export default GoalsContainer;
