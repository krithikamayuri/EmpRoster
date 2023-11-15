/*
import React from 'react';
import { shallow } from 'enzyme';
import AdminDashboard from '../src/boundary/adminDashboard';

describe('AdminDashboard Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.exists()).toBe(true);
  });

  // Add more test cases based on your component's functionality

  it('should handle form submission with valid data', async () => {
    const wrapper = shallow(<AdminDashboard />);
    
    // Simulate setting values for form fields
    wrapper.find('input[name="emp_name"]').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('input[name="emp_phoneno"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('input[name="emp_email"]').simulate('change', { target: { value: 'john@example.com' } });
    wrapper.find('input[name="emp_psw"]').simulate('change', { target: { value: 'password123' } });
    wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'password123' } });
    wrapper.find('textarea[name="emp_address"]').simulate('change', { target: { value: '123 Main St' } });

    // Mock the axios post method to simulate a successful form submission
    jest.spyOn(wrapper.instance(), 'handlesubmit').mockImplementation(() => {
      wrapper.setState({ isLoading: false }); // Mock setting loading state to false
      return Promise.resolve({ data: { msg: 'Registration successful' } });
    });

    // Simulate form submission
    await wrapper.instance().handlesubmit();

    // Assert that the state was updated appropriately
    expect(wrapper.state('isLoading')).toBe(false);

    // Add more assertions based on the expected behavior of your component
  });

  // Add more test cases as needed
});
*/

import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AdminDashboard from '../src/boundary/adminDashboard';

// Mock Axios requests
const mock = new MockAdapter(axios);

describe('AdminDashboard Component', () => {
  //afterEach(() => {
  //  jest.clearAllMocks();
  //});

  it('should render without errors', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should update state on input change', () => {
    const wrapper = shallow(<AdminDashboard />);
      wrapper.find('#openForm').simulate('click');
      
      const nameInput = wrapper.find('input[name="emp_name"]');
  
      nameInput.simulate('change', { target: { value: 'John Doe' } });
  
      expect(wrapper.find('input[name="emp_name"]').prop('value')).toBe('John Doe');
  });

  it('should prevent form submission when required fields are not filled', () => {
    const wrapper = shallow(<AdminDashboard />);
    
    // Simulate form submission
    wrapper.find('#openForm').simulate('click');

    wrapper.find('#submitForm').simulate('click');

    expect(wrapper.find('#error-message').text()).toBe("Please fill in all required fields.");
  });

  it('should submit form when required fields are filled', async () => {
    const wrapper = shallow(<AdminDashboard />);
    wrapper.find('#openForm').simulate('click');

    // Mock the successful response
    mock.onPost('/api/register-admins').reply(200, { msg: 'Success' });

    // Fill in required fields
    wrapper.find('input[name="emp_name"]').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('input[name="emp_phoneno"]').simulate('change', { target: { value: '12345678' } });
    wrapper.find('input[name="emp_psw"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[name="emp_email"]').simulate('change', { target: { value: 'john@example.com' } });
    wrapper.find('textarea[name="emp_address"]').simulate('change', { target: { value: '123 Main St' } });
    wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'password' } });

    // Simulate form submission
    wrapper.find('#submitForm').simulate('click');

    // Assert that form submission is successful
    expect(wrapper.find('#error-message').length).toBe(0); // No error messages should be displayed
  });

  it('should display error message on failed form submission', async () => {
    const wrapper = shallow(<AdminDashboard />);
  wrapper.find('#openForm').simulate('click');

  // Mock the failed response
  mock.onPost('/api/register-admins').reply(500);

  // Fill in required fields
  wrapper.find('input[name="emp_name"]').simulate('change', { target: { value: 'John Doe' } });
  wrapper.find('input[name="emp_phoneno"]').simulate('change', { target: { value: '12345678' } });
  wrapper.find('input[name="emp_psw"]').simulate('change', { target: { value: 'password' } });
  wrapper.find('input[name="emp_email"]').simulate('change', { target: { value: 'john@example.com' } });
  wrapper.find('textarea[name="emp_address"]').simulate('change', { target: { value: '123 Main St' } });
  wrapper.find('input[name="confirmPassword"]').simulate('change', { target: { value: 'password' } });

  // Simulate form submission
  await wrapper.find('#submitForm').simulate('click');

  // Wait for the next tick to allow asynchronous code to complete
  await new Promise(resolve => setImmediate(resolve));

  // Assert that error message is displayed
  expect(wrapper.find('#error-message').text()).toBe("Something went wrong");
  });
});
