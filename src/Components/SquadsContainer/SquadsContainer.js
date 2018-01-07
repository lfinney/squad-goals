import React from 'react';
import PropTypes from 'prop-types';
import SquadCard from '../SquadCard/SquadCard';

const SquadsContainer = ({ squadData }) => {
  const squadsInfo = squadData.map((squad) => {
    return (
      <SquadCard
        squad={squad}
        key={`squad-${squad.id}`}
      />
    );
  });

  const createNewSquad = () => {
    console.log('hello');
  };

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
          onClick={() => createNewSquad()}
          type="button"
          value="New Squad"
        />
      </div>
    </div>
  );
};

SquadsContainer.propTypes = {
  squadData: PropTypes.arrayOf(PropTypes.object),
};

export default SquadsContainer;
