import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SquadCard = ({ squad, leaveGroup, userId }) => {
  return (
    <tr className="squad-row">
      <td>
        <Link to={{
          pathname: `/Squad/${squad.id}`,
          state: { userId },
        }}
        >
          {squad.squad_name}
        </Link>
      </td>
      <td>{squad.id}</td>
      <td>{squad.id}</td>
    </tr>
  );
};

SquadCard.propTypes = {
  squad: PropTypes.object,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default SquadCard;
