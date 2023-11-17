import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import ShiftCancel from '../src/boundary/processShiftCancel';
import { createSerializer } from 'enzyme-to-json';

jest.mock('axios');

// Configure enzyme-to-json
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('ShiftCancel Component', () => {
  it('should render without errors', () => {
    const wrapper = mount(<ShiftCancel />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should fetch shift cancellation requests on mount', async () => {
    const mockData = {
      data: {
        status: true,
        data: [
          {
            id: 1,
            empId: 'EMP001',
            empName: 'John Doe',
            shiftId: 'SHIFT001',
            message: 'Shift cancellation request',
            file: 'file.txt',
            status: 'pending',
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockData);

    let wrapper;

    await act(async () => {
      wrapper = mount(<ShiftCancel />);
    });

    expect(axios.get).toHaveBeenCalledWith('/api/getCancelShiftRequests');
    expect(wrapper).toMatchSnapshot();
  });
});
