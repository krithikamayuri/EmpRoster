import React from 'react';
import { shallow } from 'enzyme';
import ShiftCancel from '../src/boundary/processShiftCancel';

describe('ShiftCancel Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ShiftCancel />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a table', () => {
    const wrapper = shallow(<ShiftCancel />);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('displays the correct title', () => {
    const wrapper = shallow(<ShiftCancel />);
    const title = wrapper.find('.topGreenHeader h1');
    expect(title.text()).toBe('Shift Cancel Requests');
  });
});
