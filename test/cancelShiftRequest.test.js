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
  
      axios.get.mockResolvedValueOnce({ data: { status: true, data: shifts } });
  
      const wrapper = shallow(<CancelShiftRequest employeeId="1" />);
  
      // Wait for the useEffect to complete
      await new Promise(resolve => setImmediate(resolve));
  
      // Assert that the shifts are rendered in the table
      const expectedLength = shifts.length;
      expect(wrapper.find('tr')).toHaveLength(expectedLength);
  });

  it('handles cancel shift request', async () => {
    const wrapper = shallow(<CancelShiftRequest employeeId="1" />);
    console.log(wrapper.html());
    const mockShift = { shiftID: 1, emp_id: 1, emp_name: 'John', shiftDate: '2024-11-11', shiftStartTime: '09:00:00', shiftEndTime: '17:00:00', createAt: '2023-11-16 19:00:00', updatedAt: '2023-11-16 19:00:00'};
    // Mock the Axios GET request to return your desired data
    axios.get.mockResolvedValueOnce({ data: { status: true, data: [mockShift] } });

    // Wait for any asynchronous rendering or updates
    await new Promise(resolve => setImmediate(resolve));

    // Find the state update function from the useState hook
    const setShifts = wrapper.find(CancelShiftRequest).props().setShifts;

    // Use the state update function to set the state with the shift data
    setShifts([mockShift]);
    
    console.log(wrapper.html());
    // Mock the response from the API
    axios.post.mockResolvedValueOnce({ data: 'Request sent successfully' });
    
    // Open the modal
    wrapper.find('#cancelRequest').simulate('click');

    // Simulate user input for "message"
    wrapper.find('#message').simulate('change', { target: { value: 'Reason for cancellation' } });

    // Simulate user input for "file" (if applicable)
    const fileInput = wrapper.find('#file');
    if (fileInput.exists()) {
        fileInput.instance().files = [new File(['file content'], 'filename.txt')];
        fileInput.simulate('change');
    }

    // Click the "Confirm Cancel" button
    wrapper.find('.btn-danger').at(1).simulate('click');

    // Wait for the asynchronous operation to complete
    await new Promise(resolve => setImmediate(resolve));

    // Assert that the cancel shift request is made with the correct data
    expect(axios.post).toHaveBeenCalledWith('/api/cancelShiftRequest', expect.any(FormData));
  });
});
