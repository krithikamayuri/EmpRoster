/*
import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import CancelShiftRequest from '../src/boundary/CancelShiftRequest';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('CancelShiftRequest Component', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = shallow(<CancelShiftRequest employeeId="1" />);
    const shifts = [
      { shiftID: 1, emp_id: 1, emp_name: 'John', shiftDate: '2023-01-01', shiftStartTime: '09:00:00', shiftEndTime: '17:00:00', customerName: 'James', customerAddress: '123 Clementi', createdAt: '2023-11-30 19:00:00', updatedAt: '2023-11-30 19:00:00'},
      { shiftID: 2, emp_id: 1, emp_name: 'John', shiftDate: '2023-12-02', shiftStartTime: '10:00:00', shiftEndTime: '18:00:00', customerName: 'Noah', customerAddress: '123 Clementi', createdAt: '2023-11-30 19:00:00', updatedAt: '2023-11-30 19:00:00'},
    ];

    axios.get.mockResolvedValue( { status: true, data: shifts } );
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();
    //wrapper = shallow(<CancelShiftRequest employeeId="1" />);
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('fetches shifts and renders them in a table', async () => {
    // Mocking the response from the API
    /*const shifts = [
        { shiftID: 1, shiftDate: '2023-01-01', shiftStartTime: '09:00', shiftEndTime: '17:00' },
        { shiftID: 2, shiftDate: '2023-01-02', shiftStartTime: '10:00', shiftEndTime: '18:00' },
      ];
  
      axios.get.mockResolvedValue( { status: true, data: shifts } );
  
      const wrapper = shallow(<CancelShiftRequest employeeId="1" />);
  
      // Wait for the useEffect to complete
      await new Promise(resolve => setImmediate(resolve));  
      expect(wrapper.find('tr')).toHaveLength(2);
  });





  it('should only display future shifts', async () => {
    /* Mocking a response with a mixture of past and future shifts
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
  console.log('Rendered HTML:', wrapper.html());*/

  // Log information about each tr element
  /*wrapper.find('tr').forEach((tr, index) => {
    console.log(`TR Element ${index + 1}:`);
    console.log('HTML:', tr.html());
    console.log('Text Content:', tr.text());
  });
  /*
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
    expect(wrapper.find('tr')).toHaveLength(futureShifts.length + 1); // +1 for the header row*/

    //expect(wrapper.find('tr')).toHaveLength(1);
    //wrapper.update();
/*
    const shifts = [
      { shiftID: 1, emp_id: 1, emp_name: 'John', shiftDate: '2023-01-01', shiftStartTime: '09:00:00', shiftEndTime: '17:00:00', customerName: 'James', customerAddress: '123 Clementi', createdAt: '2023-11-30 19:00:00', updatedAt: '2023-11-30 19:00:00'},
      { shiftID: 2, emp_id: 1, emp_name: 'John', shiftDate: '2023-12-02', shiftStartTime: '10:00:00', shiftEndTime: '18:00:00', customerName: 'Noah', customerAddress: '123 Clementi', createdAt: '2023-11-30 19:00:00', updatedAt: '2023-11-30 19:00:00'},
    ];

    axios.get.mockResolvedValue( { status: true, data: shifts } );

    await act(async () => {
      // Render the component
      wrapper = shallow(<CancelShiftRequest employeeId="1" />);
      // Wait for asynchronous operations to complete
      await new Promise(resolve => setImmediate(resolve));
    });

    wrapper.find('tr').forEach((tr, index) => {
      console.log(`TR Element ${index + 1}:`);
      console.log('HTML:', tr.html());
      console.log('Text Content:', tr.text());
    });
    
    wrapper.find('#cancelRequest').simulate('click');

    
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
*/


import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import CancelShiftRequest from '../src/boundary/CancelShiftRequest';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValue({ data: { status: true, data: [] } });
});

describe('CancelShiftRequest Component', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<CancelShiftRequest employeeId="123" />);
    expect(wrapper.exists()).toBe(true);
  });

  it('fetches shifts on mount', async () => {
    const wrapper = shallow(<CancelShiftRequest employeeId="123" />);
    expect(axios.get).toHaveBeenCalledWith('/api/fetchShifts/123');
    const mockData = {
      status: true,
      data: [
        {
          shiftID: '1',
          shiftDate: '2023-01-01',
          shiftStartTime: '08:00 AM',
          shiftEndTime: '04:00 PM',
        },
        // Add more shifts as needed
      ],
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    await new Promise(resolve => setImmediate(resolve));

    expect(wrapper.state('shifts')).toEqual(mockData.data);
  });

  it('handles cancel shift button click', async () => {
    const wrapper = shallow(<CancelShiftRequest employeeId="123" />);
    const mockShift = {
      shiftID: '1',
      shiftDate: '2023-01-01',
      shiftStartTime: '08:00 AM',
      shiftEndTime: '04:00 PM',
    };

    // Mock the axios post request for canceling a shift
    axios.post.mockResolvedValueOnce({ data: { message: 'Cancellation request sent successfully' } });

    // Set the shifts in the state to test selecting a shift
    wrapper.setState({ shifts: [mockShift] });

    // Simulate clicking the cancel shift button
    wrapper.find('#cancelRequest').simulate('click');

    // Check if the modal is displayed
    expect(wrapper.find('#cancelModal').exists()).toBe(true);

    // Set cancellation reason and submit the form
    wrapper.setState({ message: 'Reason for cancellation' });
    wrapper.find('#submit').simulate('click');

    await new Promise(resolve => setImmediate(resolve));

    expect(axios.post).toHaveBeenCalledWith('/api/cancelShiftRequest', expect.any(FormData));
    expect(wrapper.state('message')).toBe(''); // Reset the message after submission
  });

  // Add more test cases as needed
});
