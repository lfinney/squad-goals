import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SquadCard = ({ squad, leaveGroup }) => {
  return (
    <tr className="squad-row">
      <td>
        <Link to={{
        pathname: `/Squad/${squad.id}`,
        state: { squad },
        }}
        >
          {squad.squad_name}
        </Link>
      </td>
      <td>{squad.id}</td>
      <td>{squad.id}</td>
      <td>
        <input
          onClick={() => leaveGroup('squads', 1)}
          type="button"
          value="Leave"
        />
      </td>
    </tr>
  );
};

SquadCard.propTypes = {
  squad: PropTypes.object,
  leaveGroup: PropTypes.func,
};

export default SquadCard;
