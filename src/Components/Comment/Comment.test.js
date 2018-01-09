import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment';
import commentData from '../../../data/test/comments_data_test';

describe('MainApp snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Comment
      commentData={commentData}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Comment
      commentData={commentData}
    />, div);
  });
});
