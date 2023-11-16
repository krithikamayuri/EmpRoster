/*
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
    const wrapper = shallow(<EmployeeReport employeeName="John Doe" shiftInfo={[{ shift_id: 1 }, { shift_id: 2 }]} />);
    
    await new Promise(resolve => setImmediate(resolve));

    expect(wrapper.find('table')).toHaveLength(0);
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
*/

import React from 'react';
import { shallow } from 'enzyme';
import EmployeeDetails from '../src/boundary/EmployeeReport';
import { getHoursWorked } from '../src/controller/shiftController.js';
import { act } from 'react-dom/test-utils';

jest.mock('../src/controller/shiftController.js');

describe('EmployeeDetails Component', () => {
  const mockShiftInfo = {
    shifts: [
      {
        shift_id: 1,
        shift_date: '2023-01-01',
        shift_start: '09:00:00',
        shift_end: '17:00:00',
      },
      // Add more shift data as needed
    ],
  };

  it('should render without errors', () => {
    const wrapper = shallow(<EmployeeDetails employeeName="John Doe" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle data fetching successfully', async () => {
    const wrapper = shallow(<EmployeeDetails employeeName="John Doe" />);

  // Mock the getHoursWorked function's response
  const mockData = {
    shifts: [
      {
        shift_id: 1,
        shift_date: '2023-01-01',
        shift_start: '09:00:00',
        shift_end: '17:00:00',
      },
      // Add more shift data as needed
    ],
  };
  getHoursWorked.mockResolvedValue(mockData);

  // Simulate the useEffect hook
  await act(async () => {
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();
  });

  // Assert the rendered table rows based on the mock data
  console.log(mockData); // Log the mock data to check its structure
  expect(wrapper.find('tbody tr')).toHaveLength(1);
  });

  it('should handle data fetching error', async () => {
    const wrapper = shallow(<EmployeeDetails employeeName="John Doe" />);

    // Mock the getHoursWorked function's response with an error
    getHoursWorked.mockRejectedValue(new Error('Error fetching data'));

    await act(async () => {
      // Wait for the useEffect hook to complete
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    expect(getHoursWorked).toHaveBeenCalledWith('John Doe');

    // Assert that an error message is displayed
    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Error fetching data');
  });

  it('should handle PDF download', async () => {
    const wrapper = shallow(<EmployeeDetails employeeName="John Doe" />);

    // Mock the getHoursWorked function's response
    getHoursWorked.mockResolvedValue(mockShiftInfo);

    await act(async () => {
      // Wait for the useEffect hook to complete
      await new Promise(resolve => setImmediate(resolve));
      wrapper.update();
    });

    // Mock the jsPDF save function
    const saveMock = jest.fn();
    window.jsPDF = {
      autoTable: jest.fn(),
      save: saveMock,
    };

    await act(async () => {
      wrapper.find('button').simulate('click');
    });

    expect(saveMock).toHaveBeenCalledWith('John_Doe_shifts.pdf');
  });
});
