import React from "react";
import { shallow } from "enzyme";
import CancelShiftRequest from "../src/boundary/CancelShiftRequest";

describe("CancelShiftRequest Component", () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CancelShiftRequest employeeId={123} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('has the correct default state', () => {
    const wrapper = shallow(<CancelShiftRequest employeeId={123} />);
    const noShiftsMessage = wrapper.find('.alert-danger').text();
    expect(noShiftsMessage).toContain('No shifts found');
  });
});
