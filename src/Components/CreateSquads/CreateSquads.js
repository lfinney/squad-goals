import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateSquads extends Component {
  postNewSquad() {
    const squadName = document.querySelector('.squad-name').value;
    const postBody = {
      squad_name: squadName,
      user_id: this.props.userId,
    };
    fetch('/api/v1/squads', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then(response => response)
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="create-squads">
        <div className="create-squads-body">
          <h1>Create New Squad</h1>
          <div className="create-squads-form">
            <input className="squad-name" type="text" placeholder="Squad Name" />
            <input
              onClick={() => {
                this.postNewSquad();
              }}
              type="button"
              value="Submit"
            />
          </div>
        </div>
      </div>
    );
  }
}

CreateSquads.propTypes = {
  userId: PropTypes.number,
};

export default CreateSquads;
