import React from 'react';
import { shallow } from 'enzyme';
import EmployeeDetails from '../src/boundary/EmployeeReport';

describe('EmployeeDetails Component', () => {
  const employeeName = 'John Doe';

  it('renders without crashing', () => {
    const wrapper = shallow(<EmployeeDetails employeeName={employeeName} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders "No shifts" message when shiftInfo is not provided', () => {
    const wrapper = shallow(<EmployeeDetails employeeName={employeeName} />);
    const noShiftsMessage = wrapper.find('p').text();
    expect(noShiftsMessage).toContain('There are no shifts listed under this employee');
  });

  it('displays the employee name in the title', () => {
    const wrapper = shallow(<EmployeeDetails employeeName={employeeName} />);
    const title = wrapper.find('h4').text();
    expect(title).toContain(`Shift Information for ${employeeName}`);
  });

  it('renders a download button', () => {
    const wrapper = shallow(<EmployeeDetails employeeName={employeeName} />);
    const downloadButton = wrapper.find('button');
    expect(downloadButton.exists()).toBe(true);
    expect(downloadButton.text()).toContain('Download PDF');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
