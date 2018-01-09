import React from 'react';
import PropTypes from 'prop-types';
import SquadCard from '../SquadCard/SquadCard';

const SquadsContainer = ({
  squadData,
  createNewSquad,
  leaveGroup,
  userId,
}) => {
  const squadsInfo = squadData.map((squad) => {
    return (
      <SquadCard
        userId={userId}
        leaveGroup={leaveGroup}
        squad={squad}
        key={`squad-${squad.id}`}
      />
    );
  });

  return (
    <div className="squads-body">
      <div>
        <h2 className="squads-body-title">Squads</h2>
        <div className="squads-body-info">
          <div className="squad-row">
            <h3>Squad Title</h3>
            <h3>Competitors</h3>
            <h3>Squad Goals</h3>
          </div>
          { squadsInfo }
        </div>
      </div>
    </div>
  );
};

SquadsContainer.propTypes = {
  squadData: PropTypes.arrayOf(PropTypes.object),
  createNewSquad: PropTypes.func,
  leaveGroup: PropTypes.func,
  userId: PropTypes.number,
};

export default SquadsContainer;
