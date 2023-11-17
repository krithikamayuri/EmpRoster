import React from 'react';
import { shallow } from 'enzyme';
import Report from '../src/boundary/report';
import AssignEmployees from '../src/boundary/assignEmployees';
import ShiftCancel from '../src/boundary/processShiftCancel';
import AddEmployee from '../src/boundary/AddEmployee';
import LatecomerReports from '../src/boundary/LatecomerReports';
import ManagerDashboard from '../src/boundary/managerDashboard';

jest.mock('../src/controller/reportController');

describe('Report Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Report />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display AssignEmployees component when Assign Employees button is clicked', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(wrapper.find(AssignEmployees).exists()).toBe(true);
  });

  it('should display ShiftCancel component when Process Shift Cancellation Requests button is clicked', () => {
    wrapper.find('button').at(2).simulate('click');
    expect(wrapper.find(ShiftCancel).exists()).toBe(true);
  });

  it('should display AddEmployee component when Add Employees button is clicked', () => {
    wrapper.find('button').at(3).simulate('click');
    expect(wrapper.find(AddEmployee).exists()).toBe(true);
  });

  it('should display LatecomerReports component when Clock In Reports button is clicked', () => {
    wrapper.find('button').at(4).simulate('click');
    expect(wrapper.find(LatecomerReports).exists()).toBe(true);
  });

  it('should display ManagerDashboard component when Go to home page button is clicked', () => {
    wrapper.find('button').at(5).simulate('click');
    expect(wrapper.find(ManagerDashboard).exists()).toBe(true);
  });
});
