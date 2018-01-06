import React from 'react';
import PropTypes from 'prop-types';


const SquadDashboard = ({ squad }) => {
  console.log(squad);
  return (
    <div className="dashboard-container">
      <div className="dashboard-body">
        <h1 className="dashboard-body-title">{squad.squad_name}</h1>
        <div className="dashboard-body-info">
          <div>
            <h2>{squad.squad_name}</h2>
          </div>
          <div>
            <h2>Members</h2>
          </div>
          <div>
            <h2>Leaderboard</h2>
          </div>
          <div>
            <h2>Upcoming Goals</h2>
          </div>
        </div>
        <div className="smack-talk">
          <h1>Smack Talk Board</h1>
        </div>
      </div>
    </div>
  );
};

SquadDashboard.propTypes = {
  squad: PropTypes.object,
};

export default SquadDashboard;
