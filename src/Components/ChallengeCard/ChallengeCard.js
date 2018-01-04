import React from 'react';
import PropTypes from 'prop-types';

const ChallengeCard = ({ challenge }) => {
  return (
    <tr className="challenge-row">
      <td>{challenge.title}</td>
      <td>{challenge.challenge_time}</td>
      <td>{challenge.challenge_points}</td>
      <td><input type="button" value="Leave" /></td>
    </tr>
  );
};

ChallengeCard.propTypes = {
  challenge: PropTypes.object,
};

export default ChallengeCard;
