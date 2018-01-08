import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SubmitComment extends Component {
  // Need to get the conversation_id via props and need to rework
  // the server endpoint to post a comment to just take a conversation_id

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
      .then(response => console.log(response))
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
