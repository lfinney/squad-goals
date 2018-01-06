import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SquadCard = ({ squad }) => {
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
      <td><input type="button" value="Leave" /></td>
    </tr>
  );
};

SquadCard.propTypes = {
  squad: PropTypes.object,
};

export default SquadCard;
