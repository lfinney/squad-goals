import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Conversation from '../Conversation/Conversation';
import SubmitComment from '../SubmitComment/SubmitComment';

class SquadDashboard extends Component {
  constructor() {
    super();
    this.state = {
      squad: {},
      activeUser: false,
    };
  }

  componentDidMount() {
    this.getSquadData();
  }

  getSquadData() {
    const url = `/api/v1/squads/${this.props.match.params.id}`;
    return this.contentFetch(url)
      .then((parsedData) => {
        this.setState({ squad: parsedData });
        this.checkForEnrolledUser();
      })
      .catch(error => console.error(error));
  }

  checkForEnrolledUser() {
    const { userId } = this.props.location.state;
    const squadId = parseInt(this.props.match.params.id);
    const url = `/api/v1/users/${userId}/squads/${squadId}`;
    return fetch(url)
      .then(result => result.json())
      .then((response) => {
        if (response.length === 1) {
          this.setState({ activeUser: true });
        }
      })
      .catch(error => console.error(error));
  }

  joinSquad() {
    const { userId } = this.props.location.state;
    const squadId = parseInt(this.props.match.params.id);
    const postBody = {
      user_id: userId,
      squad_id: squadId,
    };
    fetch(`/api/v1/users/${userId}/squads/${squadId}`, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response)
      .catch(error => console.error(error));
  }

  leaveSquad() {
    const { userId } = this.props.location.state;
    const squadId = parseInt(this.props.match.params.id);
    fetch(`/api/v1/users/${userId}/squads/${squadId}`, {
      method: 'DELETE',
    })
      .then(response => response)
      .catch(error => console.error(error));
  }

  contentFetch(url) {
    return fetch(url)
      .then(result => result.json())
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-body">
          <h1 className="dashboard-body-title">{this.state.squad.squad_name}</h1>
          <div className="dashboard-body-info">
            <div className="squad-dashbord-body-titles">
              <div>
                <h2>{this.state.squad.squad_name}</h2>
              </div>
              <div>
                <h2>Members</h2>
              </div>
              <div>
                <h2>Leaderboard</h2>
              </div>
              <div>
                <h2>Upcoming Goals</h2>
              </div>
            </div>
            <div className="squad-dashboard-button">
              <div>
                <Link to={{
                  pathname: '/CreateGoals',
                  state: { userId: this.props.location.state.userId },
                }}
                >
                New Goal
                </Link>
              </div>
              { this.state.activeUser ?
                <div>
                  <input
                    className=""
                    onClick={() => this.leaveSquad()}
                    type="submit"
                    value="Leave Squad"
                  />
                </div>
                :
                <div>
                  <input
                    className=""
                    onClick={() => this.joinSquad()}
                    type="submit"
                    value="Join A Squad"
                  />
                </div>
            }
            </div>
          </div>
          { this.state.squad.conversation !== undefined &&
            <div className="conversation-container">
              <Conversation comments={this.state.squad.conversation} />
              <SubmitComment conversationId={this.state.squad.conversation_id} />
            </div>
          }
        </div>
      </div>
    );
  }
}

SquadDashboard.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  location: PropTypes.object,
  state: PropTypes.object,
  id: PropTypes.string,
};

export default SquadDashboard;
