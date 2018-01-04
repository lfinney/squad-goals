import React from 'react';
import PropTypes from 'prop-types';

const SquadCard = ({ squad }) => {
  console.log(squad);
  return (
    <tr className="squad-row">
      <td>Squad Title</td>
      <td>Competitors</td>
      <td>Squad Challenges</td>
      <td><input type="button" value="Leave" /></td>
    </tr>
  );
};

SquadCard.propTypes = {
  squad: PropTypes.object,
};

export default SquadCard;
