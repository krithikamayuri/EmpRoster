import React from 'react';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import TimeTracking from '../src/boundary/TimeTracking';

jest.mock('axios');

describe('TimeTracking Component', () => {
  let wrapper;
  const mockClockInResponse = {
    data: {
      status: 'true',
      data: {
        clockIn: '10:00:00',
        clockOut: null,
      },
    },
  };
  const mockClockOutResponse = {
    data: {
      status: 'true',
      data: {
        clockIn: '10:00:00',
        clockOut: '18:00:00',
      },
    },
  };

  const axiosMock = new MockAdapter(axios);

  beforeEach(() => {
    wrapper = shallow(<TimeTracking userEmail="test@example.com" userName="Test User" />);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should fetch employee data and clock-in time on mount', async () => {
    axiosMock.onGet('/api/employee/test@example.com').reply(200, { emp_id: 123, emp_name: 'Test User' });
    axiosMock.onGet('/api/fetchClockInOut?empId=123&date=' + moment().format('MMMM D, YYYY')).reply(200, mockClockInResponse);

    await wrapper.instance().componentDidMount();

    expect(wrapper.state('empId')).toBe(123);
    expect(wrapper.state('empName')).toBe('Test User');
    expect(wrapper.state('clockInTime')).toBe('10:00:00');
    expect(wrapper.state('clockInDisabled')).toBe(true);
  });

  it('should handle clock-in button click', async () => {
    axiosMock.onPost('/api/clockinout').reply(200, mockClockInResponse);

    await wrapper.instance().handleClockIn();

    expect(wrapper.state('clockInTime')).toBe('10:00');
    expect(wrapper.state('clockInDisabled')).toBe(true);
  });

  it('should handle clock-out button click', async () => {
    axiosMock.onPost('/api/updateClockOut').reply(200, mockClockOutResponse);

    await wrapper.instance().handleClockOut();

    expect(wrapper.state('clockOutTime')).toBe('18:00');
    expect(wrapper.state('clockOutDisabled')).toBe(true);
  });

  it('should disable clock-out button if clock-in is not done', () => {
    wrapper.setState({ clockInTime: null });

    const clockOutButton = wrapper.find('.btn-danger');
    expect(clockOutButton.prop('disabled')).toBe(true);
  });

  it('should disable clock-in button if clock-out is already done', async () => {
    axiosMock.onGet('/api/fetchClockInOut?empId=123&date=' + moment().format('MMMM D, YYYY')).reply(200, mockClockOutResponse);
    await wrapper.instance().componentDidMount();

    const clockInButton = wrapper.find('.btn-success');
    expect(clockInButton.prop('disabled')).toBe(true);
  });

  // Add more test cases as needed

});
