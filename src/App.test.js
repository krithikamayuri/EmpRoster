import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Login from '../src/boundary/login';
import AdminDashboard from '../src/boundary/adminDashboard';
import EmployeeDashboard from '../src/boundary/employeeDashboard';
import ManagerDashboard from '../src/boundary/managerDashboard';
import Management from "../src/boundary/Management";

describe('App Component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders Login component when not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find(EmployeeDashboard)).toHaveLength(0);
    expect(wrapper.find(ManagerDashboard)).toHaveLength(0);
    expect(wrapper.find(AdminDashboard)).toHaveLength(0);
    expect(wrapper.find(Management)).toHaveLength(0);
  });

  it('does not display a logout button when not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('button.btn-danger')).toHaveLength(0);
  });
});
