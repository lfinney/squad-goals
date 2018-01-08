import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentData }) => {
  return (
    <div className="smack-talk">
      <h1>{commentData.body}</h1>
    </div>
  );
};

Comment.propTypes = {
  commentData: PropTypes.object,
};

export default Comment;
