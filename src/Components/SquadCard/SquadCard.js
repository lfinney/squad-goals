import React from 'react';
import PropTypes from 'prop-types';

const SquadCard = ({ squad }) => {
  return (
    <tr className="squad-row">
      <td>{squad.squad_name}</td>
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
