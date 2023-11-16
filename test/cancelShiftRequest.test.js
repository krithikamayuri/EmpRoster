import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import CancelShiftRequest from '../src/boundary/CancelShiftRequest';

jest.mock('axios');

describe('CancelShiftRequest Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<CancelShiftRequest />);
    expect(wrapper.exists()).toBe(true);
  });

  it('fetches shifts and renders them in a table', async () => {
    // Mocking the response from the API
    const shifts = [
        { shiftID: 1, shiftDate: '2023-01-01', shiftStartTime: '09:00', shiftEndTime: '17:00' },
        { shiftID: 2, shiftDate: '2023-01-02', shiftStartTime: '10:00', shiftEndTime: '18:00' },
      ];
  
      axios.get.mockResolvedValue( { status: true, data: shifts } );
  
      const wrapper = shallow(<CancelShiftRequest employeeId="1" />);
  
      // Wait for the useEffect to complete
      await new Promise(resolve => setImmediate(resolve));
  
      // Assert that the shifts are rendered in the table
      const expectedLength = shifts.length;
      expect(wrapper.find('tr')).toHaveLength(expectedLength);
  });





  it('should only display future shifts', async () => {
    // Mocking a response with a mixture of past and future shifts
    const shifts = [
      { shiftID: 1, shiftDate: '2024-01-01', shiftStartTime: '09:00', shiftEndTime: '17:00' }, // Future shift
      { shiftID: 2, shiftDate: '2025-01-02', shiftStartTime: '10:00', shiftEndTime: '18:00' }, // Future shift
      { shiftID: 3, shiftDate: '2023-01-01', shiftStartTime: '11:00', shiftEndTime: '19:00' }, // Past shift
    ];
  
    axios.get.mockResolvedValue({ status: true, data: shifts });
  
    const wrapper = shallow(<CancelShiftRequest employeeId="1" />);
  
    // Wait for the useEffect to complete
    await new Promise(resolve => setImmediate(resolve));

    // Log the rendered HTML structure
  console.log('Rendered HTML:', wrapper.html());

  // Log information about each tr element
  wrapper.find('tr').forEach((tr, index) => {
    console.log(`TR Element ${index + 1}:`);
    console.log('HTML:', tr.html());
    console.log('Text Content:', tr.text());
  });
  
    // Assert that only the future shifts are rendered in the table
    const futureShifts = shifts.filter(shift => new Date(shift.shiftDate) > new Date());
  
    futureShifts.forEach((shift, index) => {
      const tr = wrapper.find('tr').at(index + 1); // Adding 1 to skip the header row
      expect(tr.find('td').at(0).text()).toEqual(shift.shiftID.toString());
      expect(tr.find('td').at(1).text()).toEqual(new Date(shift.shiftDate).toISOString().split('T')[0]);
      expect(tr.find('td').at(2).text()).toEqual(shift.shiftStartTime);
      expect(tr.find('td').at(3).text()).toEqual(shift.shiftEndTime);
      // Add more assertions if needed
    });
  
    // Ensure there are no extra rows
    expect(wrapper.find('tr')).toHaveLength(futureShifts.length + 1); // +1 for the header row
  });
  





  it('should get shifts', async () => {
    // Mocking the response with both future and past shifts
    const shifts = [
      { shiftID: 1, shiftDate: '2025-01-01', shiftStartTime: '09:00', shiftEndTime: '17:00' }, // Future shift
      { shiftID: 2, shiftDate: '2022-01-01', shiftStartTime: '10:00', shiftEndTime: '18:00' }, // Past shift
    ];

    const wrapper = shallow(<CancelShiftRequest employeeId="1" />);

    axios.get.mockResolvedValueOnce({ data: { status: true, data: shifts } });

    // Wait for the useEffect to complete
    await new Promise((resolve) => setImmediate(resolve));

    // Force re-render after fetching shifts
    wrapper.update();

    //console.log(wrapper.html());
    // Assert that the component renders only the future shift
    expect(wrapper.find('tr')).toHaveLength(2);
    expect(wrapper.find('tr td').at(0).text()).toEqual('1'); // Check the Shift ID of the displayed shift
  });

  it('handles cancel shift request', async () => {
    const wrapper = shallow(<CancelShiftRequest employeeId="1" />);

    // Mock the response for fetching shifts
    const shifts = [{ shiftID: 3000, emp_id: 1, emp_name: 'John', shiftDate: '2024-01-01', shiftStartTime: '09:00:00', shiftEndTime: '17:00:00', createdAt: '2023-10-01 19:00:00', updatedAt: '2023-10-01 19:00:00'}];
    axios.get.mockResolvedValueOnce({ data: { status: true, data: shifts } });

    // Wait for the useEffect to complete
    await new Promise((resolve) => setImmediate(resolve));
    
    // Force re-render after fetching shifts
    wrapper.update();

    //console.log(wrapper.html());
    // Mock the selected shift and message
    const selectedShift = { shiftID: 1 };
    const message = 'Cancellation reason';
    wrapper.find('#cancelRequest').simulate('click'); // Simulate clicking the cancel button
    wrapper.update(); // Force re-render after state change
    wrapper.setState({ selectedShift, message });

    // Mock the file
    const file = new File(['file contents'], 'file.txt', { type: 'text/plain' });
    wrapper.setState({ file });

    // Mock the axios post request
    axios.post.mockResolvedValueOnce({ data: 'Success' });

    // Simulate clicking the confirm cancel button
    wrapper.find('#submit').simulate('click');

    // Wait for the axios post request to complete
    await new Promise((resolve) => setImmediate(resolve));

    // Assert that the axios post request was called with the correct data
    expect(axios.post).toHaveBeenCalledWith('/api/cancelShiftRequest', expect.any(FormData));
  });
});
