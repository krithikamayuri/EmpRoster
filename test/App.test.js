import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../src/boundary/App';
import Login from '../src/boundary/login';
import AdminDashboard from '../src/boundary/adminDashboard';
import EmployeeDashboard from '../src/boundary/employeeDashboard';
import ManagerDashboard from '../src/boundary/managerDashboard';
import Management from '../src/boundary/Management';

jest.mock('../src/boundary/login');
jest.mock('../src/boundary/adminDashboard');
jest.mock('../src/boundary/employeeDashboard');
jest.mock('../src/boundary/managerDashboard');
jest.mock('../src/boundary/Management');

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render Login component when not logged in', () => {
    expect(wrapper.find(Login).exists()).toBe(true);
    expect(wrapper.find(AdminDashboard).exists()).toBe(false);
    expect(wrapper.find(EmployeeDashboard).exists()).toBe(false);
    expect(wrapper.find(ManagerDashboard).exists()).toBe(false);
    expect(wrapper.find(Management).exists()).toBe(false);
  });

  it('should render the correct dashboard based on user type', () => {
    wrapper.setState({
      isLoggedIn: true,
      userType: 'admin',
    });

    expect(wrapper.find(Login).exists()).toBe(false);
    expect(wrapper.find(AdminDashboard).exists()).toBe(true);
    expect(wrapper.find(EmployeeDashboard).exists()).toBe(false);
    expect(wrapper.find(ManagerDashboard).exists()).toBe(false);
    expect(wrapper.find(Management).exists()).toBe(false);
  });

  // Add more test cases as needed

});
