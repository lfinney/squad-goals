import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ commentData }) => {
  return (
    <div className="comment">
      <p>{commentData.body}</p>
    </div>
  );
};

Comment.propTypes = {
  commentData: PropTypes.object,
};

export default Comment;
