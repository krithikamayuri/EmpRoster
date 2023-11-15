import React from 'react';
import { shallow } from 'enzyme';
import jsPDF from 'jspdf';
import EmployeeReport from '../src/boundary/EmployeeReport';

// Mock the jspdf library to avoid actual PDF generation
jest.mock('jspdf');

describe('EmployeeReport Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<EmployeeReport employeeName="John Doe" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render shift information table with multiple shifts', () => {
    const wrapper = shallow(
      <EmployeeReport employeeName="John Doe" shiftInfo={[{ shift_id: 1 }, { shift_id: 2 }]} />
    );
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('tr')).toHaveLength(3); // Header row + two shift rows
  });

  it('should render shift information table with a single shift', () => {
    const wrapper = shallow(
      <EmployeeReport employeeName="John Doe" shiftInfo={{ shift_id: 1 }} />
    );
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('tr')).toHaveLength(2); // Header row + one shift row
  });

  it('should render no shifts message when there are no shifts', () => {
    const wrapper = shallow(<EmployeeReport employeeName="John Doe" />);
    expect(wrapper.find('p').text()).toBe('There are no shifts listed under this employee');
  });

  it('should call handleDownloadPDF on button click', () => {
    const wrapper = shallow(<EmployeeReport employeeName="John Doe" />);
    const handleDownloadPDFSpy = jest.spyOn(wrapper.instance(), 'handleDownloadPDF');
    wrapper.find('button').simulate('click');
    expect(handleDownloadPDFSpy).toHaveBeenCalled();
  });

  it('should generate PDF with correct content on button click', () => {
    const wrapper = shallow(<EmployeeReport employeeName="John Doe" shiftInfo={{ shift_id: 1 }} />);
    wrapper.find('button').simulate('click');
    expect(jsPDF).toHaveBeenCalled(); // jsPDF constructor is called
    expect(jsPDF().text).toHaveBeenCalledWith("John Doe's Shifts"); // Check if text is added to the PDF
    // Add more assertions based on your specific content and structure
  });
});
