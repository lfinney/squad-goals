import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubmitComment extends Component {
  postNewComment() {
    const commentBody = document.querySelector('.squad-name').value;
    const postBody = {
      body: commentBody,
      conversation_id: this.props.conversation_id,
    };
    fetch('/api/v1/comments', {
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
      <div className="submit-comment">
        <div className="submit-comment-form">
          <input
            className="submit-comment-input"
            type="text"
            placeholder="What do you want to say?"
          />
          <input
            className="submit-comment-button nav-button"
            onClick={() => {
              this.postNewComment();
            }}
            type="button"
            value="Submit"
          />
        </div>
      </div>
    );
  }
}

SubmitComment.propTypes = {
  conversation_id: PropTypes.number,
};

export default SubmitComment;
