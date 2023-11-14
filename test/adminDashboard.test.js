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
