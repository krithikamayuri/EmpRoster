import React from 'react';
import { shallow, mount } from 'enzyme';
import ManagerDashboard from '../src/boundary/ManagerDashboard';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('ManagerDashboard Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<ManagerDashboard />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should fetch events and update state', async () => {
    const mockEvents = [
        { id: 1, title: 'Shift 1', date: '2023-01-01', start: '2023-01-01T08:00:00', end: '2023-01-01T17:00:00' },
        { id: 2, title: 'Shift 2', date: '2023-01-02', start: '2023-01-02T09:00:00', end: '2023-01-02T18:00:00' },
    ];

    // Mock the Axios request
    axios.post.mockResolvedValue({ data: mockEvents });

    // Shallow render the component
    const wrapper = shallow(<ManagerDashboard />);

    // Ensure the component re-renders after state update
    await act(async () => {
        await new Promise((resolve) => setImmediate(resolve));
        wrapper.update();
    });

    // Assert that the state variable 'events' is updated with the mockEvents
    expect(wrapper.prop('events')).toEqual(mockEvents);
  });

  it('should handle button clicks and update state accordingly', () => {
    const wrapper = shallow(<ManagerDashboard />);
    
    wrapper.find('button').at(0).simulate('click'); // Simulate the first button click

    // Assert that the state variable 'reportButtonPressed' is true and others are false
    expect(wrapper.prop('reportButtonPressed')).toBe(true);
    expect(wrapper.prop('shiftButtonPressed')).toBe(false);
    
  });
});
