import React from 'react';
import { shallow } from 'enzyme';
import AssignEmployees from '../src/boundary/assignEmployees';
import { assignEmployees } from '../src/controller/assignEmployeesController';
import { act } from 'react-dom/test-utils';

jest.mock('../src/controller/assignEmployeesController');

describe('AssignEmployees Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<AssignEmployees />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle week change', () => {
    const wrapper = shallow(<AssignEmployees />);
    const dateInput = wrapper.find('input[type="date"]');

    dateInput.simulate('change', { target: { value: '2023-01-01' } });

    expect(wrapper.find('input[type="date"]').prop('value')).toEqual('2023-01-01');
  });

  it('should handle form submission with successful assignment', async () => {
    const wrapper = shallow(<AssignEmployees />);
    const mockEvent = { preventDefault: jest.fn() };

    // Mock the assignEmployees function's response
    assignEmployees.mockResolvedValue({
      message: 'Assignment successful',
    });

    await act(async () => {
      wrapper.find('form').simulate('submit', mockEvent);
    });

    await new Promise(resolve => setImmediate(resolve));

    expect(assignEmployees).toHaveBeenCalledWith(expect.any(Array));

    expect(wrapper.find('.success-message').text()).toBe('Shift information successfully added.');
  });

  it('should handle form submission with failed assignment', async () => {
    const wrapper = shallow(<AssignEmployees />);
    const mockEvent = { preventDefault: jest.fn() };

    assignEmployees.mockResolvedValue({
      message: 'Shift information failed to add.',
    });

    await act(async () => {
      wrapper.find('form').simulate('submit', mockEvent);
    });

    await new Promise(resolve => setImmediate(resolve));

    expect(assignEmployees).toHaveBeenCalledWith(expect.any(Array));

    const successMessage = wrapper.find('.success-message');
    expect(successMessage.exists()).toBe(false);

    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('Shift information failed to add.');
  });
});
