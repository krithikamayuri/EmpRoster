import React from 'react';
import { shallow } from 'enzyme';
import MySwapRequests from '../src/boundary/myswaprequests';

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

  it('renders the table when requests are loaded', () => {
    const receivedData = [{ swapReqId: 1, date: '2023-01-01', status: 'pending', requestedByName: 'John' }];
    const wrapper = shallow(<MySwapRequests empEmail="test@example.com" employeeId={123} isLoading={false} received={receivedData} />);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('renders rejection button when request status is pending', () => {
    const receivedData = [{ swapReqId: 1, date: '2023-01-01', status: 'pending', requestedByName: 'John', message: 'Test message' }];
    const wrapper = shallow(<MySwapRequests empEmail="test@example.com" employeeId={123} received={receivedData} />);
    expect(wrapper.find('.btn-danger')).toHaveLength(1);
  });

  it('renders acceptance button when request status is pending', () => {
    const receivedData = [{ swapReqId: 1, date: '2023-01-01', status: 'pending', requestedByName: 'John', message: 'Test message' }];
    const wrapper = shallow(<MySwapRequests empEmail="test@example.com" employeeId={123} received={receivedData} />);
    expect(wrapper.find('.btn-success')).toHaveLength(1);
  });
});
