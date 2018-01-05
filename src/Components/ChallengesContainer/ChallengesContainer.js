import React from 'react';
import PropTypes from 'prop-types';
import ChallengeCard from '../ChallengeCard/ChallengeCard';

const ChallengesContainer = ({ challengeData }) => {
  const challengeInfo = challengeData.map((challenge) => {
    return (
      <ChallengeCard
        challenge={challenge}
        key={`challenge-${challenge.id}`}
      />
    );
  });

  return (
    <div className="challenge-body">
      <h2 className="challenge-body-title">Challenges</h2>
      <table className="challenge-body-info">
        <tbody>
          <tr className="challenge-row">
            <th>Challenge Title</th>
            <th>Challenge Time </th>
            <th>Challenge Points </th>
            <th />
          </tr>
          { challengeInfo }
        </tbody>
      </table>
    </div>
  );
};

ChallengesContainer.propTypes = {
  challengeData: PropTypes.arrayOf(PropTypes.object),
};

export default ChallengesContainer;
