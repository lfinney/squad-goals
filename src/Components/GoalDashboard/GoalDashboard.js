import React from 'react';
import PropTypes from 'prop-types';


const GoalDashboard = ({ goal }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <h1 className="dashboard-body-title">Goal Name</h1>
        <div className="dashboard-body-info">
          <div>
            <h2>{goal.title}</h2>
          </div>
          <div>
            <h2>{goal.description}</h2>
          </div>
          <div>
            <h2>{goal.goal_time}</h2>
          </div>
          <div>
            <h2>{goal.goal_points}</h2>
          </div>
        </div>
        <div className="smack-talk">
          <h1>Smack Talk Board</h1>
        </div>
      </div>
    </div>
  );
};

GoalDashboard.propTypes = {
  goal: PropTypes.object,
};

export default GoalDashboard;
