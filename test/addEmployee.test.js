import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddEmployee from '../src/boundary/AddEmployee';

// Mock Axios requests
const mock = new MockAdapter(axios);

describe('AddEmployee Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<AddEmployee />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should update state on input change', () => {
    const wrapper = shallow(<AddEmployee />);
    
    const nameInput = wrapper.find('input[name="emp_name"]');
  
    nameInput.simulate('change', { target: { value: 'John Doe' } });
  
    expect(wrapper.find('input[name="emp_name"]').prop('value')).toBe('John Doe');
  });

  it('should prevent form submission when required fields are not filled', () => {
    const wrapper = shallow(<AddEmployee />);
    
    // Simulate form submission
    wrapper.find('#submitForm').simulate('click');

    expect(wrapper.find('#error-message').text()).toBe("Please fill in all required fields.");
  });

  it('should submit form when required fields are filled', async () => {
    const wrapper = shallow(<AddEmployee />);

    // Mock the successful response
    mock.onPost('/api/createEmployee').reply(200, { msg: 'Success' });

    // Fill in required fields
    wrapper.find('input[name="emp_name"]').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('input[name="emp_phoneno"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('input[name="emp_emergency_contact"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('input[name="emp_email"]').simulate('change', { target: { value: 'john@example.com' } });
    wrapper.find('input[name="emp_psw"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('textarea[name="emp_address"]').simulate('change', { target: { value: '123 Main St' } });
    wrapper.find('select[name="emp_type"]').simulate('change', { target: { value: 'partTime' } })

    // Simulate form submission
    wrapper.find('#submitForm').simulate('click');

    expect(wrapper.find('#error-message').length).toBe(0);
  });

  it('should display error message on failed form submission', async () => {
    const wrapper = shallow(<AddEmployee />);

    // Mock the failed response
    mock.onPost('/api/createEmployee').reply(500);

    // Fill in required fields
    wrapper.find('input[name="emp_name"]').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('input[name="emp_phoneno"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('input[name="emp_emergency_contact"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('input[name="emp_email"]').simulate('change', { target: { value: 'john@example.com' } });
    wrapper.find('input[name="emp_psw"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('textarea[name="emp_address"]').simulate('change', { target: { value: '123 Main St' } });
    wrapper.find('select[name="emp_type"]').simulate('change', { target: { value: 'partTime' } })

    // Simulate form submission
    await wrapper.find('#submitForm').simulate('click');

    // Wait for the next tick to allow asynchronous code to complete
    await new Promise(resolve => setImmediate(resolve));

    // Assert that error message is displayed
    expect(wrapper.find('#error-message').text()).toBe("Error saving data.");
  });
});
