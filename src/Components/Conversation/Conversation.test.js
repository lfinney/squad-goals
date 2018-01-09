/* eslint-disable */
import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import Conversation from './Conversation';
import conversationData from '../../../data/test/comments_data_test';

describe('MainApp snapshot', () => {
  it('should always match the snapshot', () => {
    const wrapper = shallow(<Conversation
      comments={conversationData}
    />);

    expect(wrapper).toMatchSnapshot();
  });


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Conversation
      comments={conversationData}
    />, div);
  });
});
