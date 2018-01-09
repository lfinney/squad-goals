import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentData }) => {
  return (
    <div className="smack-talk">
      <p>{commentData.body}</p>
    </div>
  );
};

Comment.propTypes = {
  commentData: PropTypes.array,
};

export default Comment;
