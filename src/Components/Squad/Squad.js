import React from 'react';
import PropTypes from 'prop-types';


const Squad = ({ squadData }) => {
  return (
    <div className="squad">
      <div className="squad-body">
        <h1 className="squad-body-title">Squad Name</h1>
        <div className="squad-body-info">
          <div>
            <h2>Members</h2>
          </div>
          <div>
            <h2>Leaderboard</h2>
          </div>
          <div>
            <h2>Upcoming Challenges</h2>
          </div>
        </div>
        <div className="smack-talk">
          <h1>Smack Talk Board</h1>
        </div>
      </div>
    </div>
  );
};

Squad.propTypes = {
  squadData: PropTypes.arrayOf(PropTypes.object),
};

export default Squad;
