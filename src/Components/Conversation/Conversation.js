import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

const Conversation = ({ comments }) => {
  const commentCards = comments.map((comment) => {
    console.log(comment);
    return (
      <Comment commentData={comment} key={`comment-${comment.id}`} />
    );
  });

  return (
    <div className="smack-talk">
      <h1>Smack Talk Board</h1>
      <div className="comment-container">
        { commentCards }
      </div>
    </div>
  );
};

Conversation.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default Conversation;
