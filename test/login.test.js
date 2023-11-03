import React from 'react';
import { shallow } from 'enzyme';
import Login from '../src/boundary/login';
import { login } from '../src/controller/loginController'; // Import the login function

// Mock the login function from loginController.js
jest.mock('../src/controller/loginController');

describe('Login Component', () => {
  it('should render without errors', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should handle email and password input changes', () => {
    const wrapper = shallow(<Login />);
    const emailInput = wrapper.find('input[type="text"]');
    const passwordInput = wrapper.find('input[type="password"]');

    emailInput.simulate('change', { target: { value: 'test@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password123' } });

    expect(wrapper.find('input[type="text"]').prop('value')).toEqual('test@example.com');
    expect(wrapper.find('input[type="password"]').prop('value')).toEqual('password123');
  });

  it('should handle form submission', async () => {
    const onLoginMock = jest.fn(); // Mock the onLogin callback
    const wrapper = shallow(<Login onLogin={onLoginMock} />);
  
    // Set up the input fields
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password123' } });
  
    // Mock the login function's response to simulate a successful login
    login.mockResolvedValue({
      message: 'Login successful',
      userTypes: 'userType',
      userEmail: 'test@example.com',
      employee_id: 123,
    });
  
    // Simulate form submission
    const form = wrapper.find('form');
    const preventDefault = jest.fn(); // Mock preventDefault function
    form.simulate('submit', { preventDefault });
  
    // Wait for the login function to be called and the state to update
    await new Promise(resolve => setTimeout(resolve, 0));
  
    // Assert that the login function was called with the correct parameters
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
  
    // Assertions for the success scenario
    // Check that the onLogin callback was called with the correct arguments
    expect(onLoginMock).toHaveBeenCalledWith('userType', 'test@example.com', 123);
  
    // Check that no error message is displayed to the user
    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(false);
  });  

  it('should handle form submission with successful login', async () => {
    const onLoginMock = jest.fn(); // Mock the onLogin callback
    const wrapper = shallow(<Login onLogin={onLoginMock} />);
  
    // Set up the input fields
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password123' } });
  
    // Mock the login function's response
    login.mockResolvedValue({
      message: 'Login successful',
      userTypes: 'userType',
      userEmail: 'test@example.com',
      employee_id: 123,
    });
  
    // Simulate form submission
    const form = wrapper.find('form');
    const preventDefault = jest.fn(); // Mock preventDefault function
    form.simulate('submit', { preventDefault });
  
    // Wait for the login function to be called and the state to update
    await new Promise(resolve => setTimeout(resolve, 0));
  
    // Assert that the login function was called with the correct parameters
    expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
  
    // Assert that the component updated its state appropriately
    expect(wrapper.find('.error-message').exists()).toBe(false);
  
    // Assertions for the success scenario
    // Check that the onLogin callback was called with the correct arguments
    expect(onLoginMock).toHaveBeenCalledWith('userType', 'test@example.com', 123);
    
    // Check that no error message is displayed to the user
    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(false);
  });
  
  it('should handle form submission with failed login', async () => {
    const onLoginMock = jest.fn(); // Mock the onLogin callback
    const wrapper = shallow(<Login onLogin={onLoginMock} />);
  
    // Set up the input fields
    wrapper.find('input[type="text"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password123' } });
  
    // Mock the login function's response to simulate a failed login
    login.mockRejectedValue(new Error('Invalid credentials'));
  
    // Simulate form submission
    const form = wrapper.find('form');
    const preventDefault = jest.fn(); // Mock preventDefault function
    form.simulate('submit', { preventDefault });
  
    // Use setTimeout to simulate asynchronous behavior
    await new Promise(resolve => setTimeout(resolve, 0));
  
    // Assertions for the failed login scenario
    // Check that the onLogin callback was not called
    expect(onLoginMock).not.toHaveBeenCalled();
    
    // Check that an error message is displayed to the user
    const errorMessage = wrapper.find('.error-message');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toBe('An error occurred. Please try again later.');
  });  
});
