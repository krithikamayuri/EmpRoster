import React from 'react';
import { shallow } from 'enzyme';
import ManagerDashboard from '../src/boundary/ManagerDashboard';

jest.mock('axios');

describe('ManagerDashboard Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ManagerDashboard userEmail="manager@example.com" />);
    expect(wrapper.exists()).toBe(true);
  });  

  it('renders buttons for different functionalities', () => {
    const wrapper = shallow(<ManagerDashboard userEmail="manager@example.com" />);
    expect(wrapper.find('button')).toHaveLength(5); // Adjust the count based on your buttons
  });

  it('renders FullCalendar component', () => {
    const wrapper = shallow(<ManagerDashboard userEmail="manager@example.com" />);
    expect(wrapper.find('FullCalendar')).toHaveLength(1);
  });
});
