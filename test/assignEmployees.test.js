import React from 'react';
import { shallow } from 'enzyme';
import AssignEmployees from '../src/boundary/AssignEmployees';
import { assignEmployees } from '../src/controller/assignEmployeesController';

// Mock the assignEmployees function from assignEmployeesController.js
jest.mock('../src/controller/assignEmployeesController');

describe('AssignEmployees Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<AssignEmployees />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle week change', () => {
    const wrapper = shallow(<AssignEmployees />);
    const dateInput = wrapper.find('input[type="date"]');

    dateInput.simulate('change', { target: { value: '2023-01-01' } });

    expect(wrapper.find('input[type="date"]').prop('value')).toEqual('2023-01-01');
  });

  it('should handle day data change', () => {
    const wrapper = shallow(<AssignEmployees />);
    const updatedData = [
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      },
      {
        date: '2023-01-01',
        staffRequired: 3,
        startTime: '09:00',
        endTime: '17:00',
      }
    ];

    wrapper.instance().handleDayDataChange(0, updatedData);

    // Assert that the state is updated correctly
    expect(wrapper.state('weekData')[0]).toEqual(updatedData);
  });

  it('should handle form submission with successful assignment', async () => {
    const wrapper = shallow(<AssignEmployees />);
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the assignEmployees function's response
    assignEmployees.mockResolvedValue({
      message: 'Assignment successful',
    });

    // Set up necessary state or input changes

    // Simulate form submission
    await wrapper.instance().handleSubmit(mockEvent);

    // Wait for the assignEmployees function to be called and the state to update
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assert that the assignEmployees function was called with the correct parameters
    expect(assignEmployees).toHaveBeenCalledWith(expect.any(Array));

    // Assertions for the success scenario
    // Check that the component updated its state appropriately
    expect(wrapper.state('successMessage')).toBe('Shift information successfully added.');
    expect(wrapper.state('errorMessage')).toBe('');

    // Additional assertions based on the specific behavior of your component
  });

  it('should handle form submission with failed assignment', async () => {
    const wrapper = shallow(<AssignEmployees />);
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the assignEmployees function's response to simulate a failed assignment
    assignEmployees.mockRejectedValue(new Error('Assignment failed'));

    // Set up necessary state or input changes

    // Simulate form submission
    await wrapper.instance().handleSubmit(mockEvent);

    // Wait for the assignEmployees function to be called and the state to update
    await new Promise(resolve => setTimeout(resolve, 0));

    // Assertions for the failed assignment scenario
    // Check that the component updated its state appropriately
    expect(wrapper.state('successMessage')).toBe('');
    expect(wrapper.state('errorMessage')).toBe('Shift information failed to add.');

    // Additional assertions based on the specific behavior of your component
  });
});
