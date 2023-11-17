import React from 'react';
import { shallow } from 'enzyme';
import SwapRequest from '../src/boundary/swaprequest';

jest.mock('../src/controller/employeeDashboardController');

describe('SwapRequest Component', () => {
  let wrapper;
  const empEmail = 'test@example.com';
  const employeeId = 123;

  beforeEach(() => {
    wrapper = shallow(<SwapRequest empEmail={empEmail} employeeId={employeeId} />);
  });

  it('should render without errors', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders a table', () => {
    const wrapper = shallow(<SwapRequest />);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  it('does not render button for swapping shifts if no future shifts', () => {
    const wrapper = shallow(<SwapRequest />);
    const swapButton = wrapper.find('button[onClick="handleModalOpen"]');
    expect(swapButton.exists()).toBe(false);
  });
});
