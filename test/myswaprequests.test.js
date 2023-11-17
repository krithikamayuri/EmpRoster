/*
import React from 'react';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import MySwapRequests from '../src/boundary/myswaprequests';
import {
  getSwapShiftRequestsAsync,
  updateSwapShiftRequest,
  getEmployeeByEmailAsync
} from '../src/controller/employeeDashboardController';

jest.mock('../src/controller/employeeDashboardController');

describe('MySwapRequests Component', () => {
  let wrapper;
  const empEmail = 'test@example.com';
  const employeeId = 123;

  beforeEach(() => {
    wrapper = shallow(<MySwapRequests empEmail={empEmail} employeeId={employeeId} />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle request status change - accepted', async () => {
    // Mock API response for getSwapShiftRequestsAsync
    const getSwapShiftRequestsResponse = {
      status: true,
      requests_sent: [],
      requests_received: [],
    };
    getSwapShiftRequestsAsync.mockResolvedValue(getSwapShiftRequestsResponse);

    // Mock API response for updateSwapShiftRequest
    const updateSwapShiftRequestResponse = {
      status: true,
    };
    updateSwapShiftRequest.mockResolvedValue(updateSwapShiftRequestResponse);

    // Mock API response for getEmployeeByEmailAsync
    const getEmployeeResponse = {
      success: true,
      employee: {
        emp_id: 456,
        emp_name: 'John Doe',
      },
    };
    getEmployeeByEmailAsync.mockResolvedValue(getEmployeeResponse);

    // Trigger the useEffect
    await act(async () => {
      // You may need to adjust the timeout based on your component's async behavior
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    // Simulate button click to open modal
    const modalBtn = wrapper.find('button[data-bs-target="#exampleModal"]');
    modalBtn.simulate('click');

    // Simulate accepting the request
    await act(async () => {
      const acceptBtn = wrapper.find('button.btn-success');
      acceptBtn.simulate('click');
    });

    // Trigger the useEffect again after the modal action
    await act(async () => {
      // You may need to adjust the timeout based on your component's async behavior
      await new Promise((resolve) => setTimeout(resolve, 0));
      wrapper.update();
    });

    // Assertions
    expect(getSwapShiftRequestsAsync).toHaveBeenCalledWith(employeeId);
    expect(updateSwapShiftRequest).toHaveBeenCalledWith({
      swapReqId: expect.any(Number),
      status: 'accepted',
      shiftId: expect.any(Number),
      requestedTo: 456,
      emp_name: 'John Doe',
    });
    expect(wrapper.find('.alert-success').text()).toBe('Request Updated Successfully');
  });
});
*/


import React from 'react';
import { shallow } from 'enzyme';
import MySwapRequests from '../src/boundary/myswaprequests';
//import * as controller from '../src/controller/employeeDashboardController';

jest.mock('../src/controller/employeeDashboardController', () => ({
  getSwapShiftRequestsAsync: jest.fn(),
}));

describe('MySwapRequests Component', () => {
  const mockEmpEmail = 'employee@example.com';
  const mockEmployeeId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<MySwapRequests empEmail={mockEmpEmail} employeeId={mockEmployeeId} />);
    expect(wrapper.exists()).toBe(true);
  });

  
});
