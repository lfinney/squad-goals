import React from 'react';
import PropTypes from 'prop-types';
import SquadCard from '../SquadCard/SquadCard';

const Squads = ({ squadData }) => {
  const squadsInfo = squadData.map((squad) => {
    return (
      <SquadCard
        squad={squad}
        key={`squad-${squad.id}`}
      />
    );
  });

  return (
    <div className="squads-body">
      <h2 className="squads-body-title">Squads</h2>
      <table className="squads-body-info">
        <tbody>
          <tr className="squad-row">
            <th>Squad Title</th>
            <th>Competitors</th>
            <th>Squad Challenges</th>
            <th />
          </tr>
          { squadsInfo }
        </tbody>
      </table>
    </div>
  );
};

Squads.propTypes = {
  squadData: PropTypes.arrayOf(PropTypes.object),
};

export default Squads;
