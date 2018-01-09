import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SquadCard = ({ squad, leaveGroup, userId }) => {
  console.log(squad);
  return (
    <div className="squad-row">
      <h3>
        <Link to={{
          pathname: `/Squad/${squad.id}`,
          state: { userId },
        }}
        >
          {squad.squad_name}
        </Link>
      </h3>
      <h3>{squad.id}</h3>
      <h3>{squad.id}</h3>
    </div>
  );
};

SquadCard.propTypes = {
  squad: PropTypes.object,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default SquadCard;
