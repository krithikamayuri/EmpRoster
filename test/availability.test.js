import React from 'react';
import { shallow } from 'enzyme';
import Availability from '../src/boundary/Avability';
import axios from 'axios';
import moment from 'moment';

jest.mock('axios');

describe('Availability Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    const wrapper = shallow(<Availability />);
    expect(wrapper.exists()).toBe(true);
  });

  it('adds a new week when clicking the "+" button', () => {
    const wrapper = shallow(<Availability userEmail="test@example.com" />);
    
    wrapper.find('#addWeek').simulate('click');
    
    expect(wrapper.find('.availability-table').length).toBe(1);
  });

  it('submits the selected dates when clicking the "Submit" button', async () => {
    const wrapper = shallow(<Availability userEmail="test@example.com" />);
    wrapper.find('#addWeek').simulate('click');
    // Mock the response from the API
    axios.post.mockResolvedValueOnce({ data: 'Data posted successfully' });

    // Perform actions like checking checkboxes
    wrapper.find('input[type="checkbox"]').first().simulate('change');

    // Trigger the submit button click
    wrapper.find('#submitForm').last().simulate('click');

    // Wait for the asynchronous operation to complete
    await new Promise(resolve => setImmediate(resolve));

    const expectedDate = calculateExpectedDate();

    // Add assertions to check if the API call is made with the correct data
    expect(axios.post).toHaveBeenCalledWith('/api/postavailable', {
      emp_id: '',
      date: [expectedDate],
    });
  });

  const calculateExpectedDate = () => {
    const lastWeek = []; // Mocking 'weeks' as an empty array

    // If there are no weeks, start from the next Sunday
    const startDate = lastWeek.length
      ? moment(lastWeek[lastWeek.length - 1].endDate).clone().add(1, 'days')
      : moment().startOf('week').add(7, 'days');

    // Return the formatted date
    return startDate.format('YYYY-MM-DD');
  };
});
