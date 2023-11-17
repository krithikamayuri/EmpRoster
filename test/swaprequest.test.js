import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import SwapRequest from '../src/boundary/swaprequest';
import {
  getEmployeeByEmailAsync,
  getEmployeesAsync,
  getShiftsByEmployee,
  createShiftSwapRequest,
} from '../src/controller/employeeDashboardController';

jest.mock('../src/controller/employeeDashboardController');

describe('SwapRequest Component', () => {
  let wrapper;
  const empEmail = 'test@example.com';
  const employeeId = 123;

  beforeEach(() => {
    wrapper = shallow(<SwapRequest empEmail={empEmail} employeeId={employeeId} />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle swap request', async () => {
    // Mock API response for getEmployeeByEmailAsync
    const getEmployeeResponse = {
      success: true,
      employee: {
        emp_id: 456,
        emp_name: 'John Doe',
      },
    };
    getEmployeeByEmailAsync.mockResolvedValue(getEmployeeResponse);

    // Mock API response for getEmployeesAsync
    const getEmployeesResponse = [
      { emp_id: 789, emp_name: 'Jane Doe', emp_email: 'jane@example.com' },
    ];
    getEmployeesAsync.mockResolvedValue(getEmployeesResponse);

    // Mock API response for getShiftsByEmployee
    const getShiftsResponse = [
      { shiftID: 1, shiftDate: '2023-01-01', emp_name: 'John Doe' },
    ];
    getShiftsByEmployee.mockResolvedValue(getShiftsResponse);

    // Mock API response for createShiftSwapRequest
    const createShiftSwapRequestResponse = {
      status: true,
    };
    createShiftSwapRequest.mockResolvedValue(createShiftSwapRequestResponse);

    // Trigger the useEffect
    await act(async () => {
      // You may need to adjust the timeout based on your component's async behavior
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    // Simulate button click to open modal
    const modalBtn = wrapper.find('button[data-bs-target="#exampleModal"]');
    modalBtn.simulate('click');

    // Simulate selecting an employee and providing a message
    wrapper.find('select').simulate('change', { target: { value: '789' } });
    wrapper.find('textarea').simulate('change', { target: { value: 'Test message' } });

    // Simulate sending the swap request
    await act(async () => {
      const sendRequestBtn = wrapper.find('button.btn-primary');
      sendRequestBtn.simulate('click');
    });

    // Trigger the useEffect again after the modal action
    await act(async () => {
      // You may need to adjust the timeout based on your component's async behavior
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    // Assertions
    expect(getEmployeeByEmailAsync).toHaveBeenCalledWith(empEmail);
    expect(getEmployeesAsync).toHaveBeenCalled();
    expect(getShiftsByEmployee).toHaveBeenCalledWith(employeeId);
    expect(createShiftSwapRequest).toHaveBeenCalledWith({
      requestedBy: 456,
      requestedTo: 789,
      shiftId: 1,
      message: 'Test message',
      status: 'pending',
      date: '2023-01-01',
    });
    expect(wrapper.find('.alert-success').text()).toBe('Request Sent Successfully');
  });

  // Ensure to mock the necessary functions and responses for other test cases.

});
