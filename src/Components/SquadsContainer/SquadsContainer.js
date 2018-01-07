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
        <table className="squads-body-info">
          <tbody>
            <tr className="squad-row">
              <th>Squad Title</th>
              <th>Competitors</th>
              <th>Squad Goals</th>
              <th />
            </tr>
            { squadsInfo }
          </tbody>
        </table>
      </div>
      <div>
        <input
          onClick={() => { createNewSquad(); }}
          type="button"
          value="New Squad"
        />
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
