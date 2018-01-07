import React, { Component } from 'react';

class CreateSquads extends Component {
  postNewSquad() {
    const squadName = document.querySelector('.squad-name').value;
    const postBody = {
      squad_name: squadName,
    };
    fetch('/api/v1/squads', {
      headers: {
        // 'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(postBody),
    })
      .then(response => console.log(response))
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

export default CreateSquads;
