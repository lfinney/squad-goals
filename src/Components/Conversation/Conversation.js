import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';

const Conversation = ({ comments }) => {
  const commentCards = comments.map((comment) => {
    return (
      <Comment commentData={comment} key={`comment-${comment.id}`} />
    );
  });

  return (
    <div className="smack-talk">
      <h1>Smack Talk Board</h1>
      { commentCards }
    </div>
  );
};

Conversation.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default Conversation;
