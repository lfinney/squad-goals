import React from 'react';
import PropTypes from 'prop-types';


const GoalDashboard = ({ squadData }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <h1 className="dashboard-body-title">Goal Name</h1>
        <div className="dashboard-body-info">
          <div>
            <h2>Title</h2>
          </div>
          <div>
            <h2>Description</h2>
          </div>
          <div>
            <h2>Day/Time</h2>
          </div>
          <div>
            <h2>Points</h2>
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
  squadData: PropTypes.arrayOf(PropTypes.object),
};

export default GoalDashboard;
