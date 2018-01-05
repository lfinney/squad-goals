import React, { Component } from 'react';

class CreateSquads extends Component {
  render() {
    return (
      <div className="create-squads">
        <div className="create-squads-body">
          <h1>Create New Squad</h1>
          <div className="create-squads-form">
            <input type="text" value="Squad Name" />
            <input type="text" value="Squad Goal" />
            <input type="button" value="Submit" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreateSquads;
