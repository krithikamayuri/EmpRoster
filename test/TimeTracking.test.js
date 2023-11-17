import React from 'react';
import { shallow } from 'enzyme';
import TimeTracking from '../src/boundary/TimeTracking';
import * as TimeTrackingController from '../src/controller/TimeTrackingController';

jest.mock('../src/controller/TimeTrackingController');

describe('TimeTracking Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TimeTracking userEmail="test@example.com" />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display clock-in and clock-out buttons', () => {
    expect(wrapper.find('.btn-success').text()).toContain('Clock In');
    expect(wrapper.find('.btn-danger').text()).toContain('Clock Out');
  });

  it('should simulate clock-in button click', async () => {
    TimeTrackingController.recordClockIn.mockResolvedValue({ status: 'success' });
    await wrapper.find('.btn-success').simulate('click');
    expect(TimeTrackingController.recordClockIn).toHaveBeenCalled();
  });

  it('should simulate clock-out button click', async () => {
    TimeTrackingController.updateClockOut.mockResolvedValue({ status: 'success' });
    await wrapper.find('.btn-danger').simulate('click');
    expect(TimeTrackingController.updateClockOut).toHaveBeenCalled();
  });
});
