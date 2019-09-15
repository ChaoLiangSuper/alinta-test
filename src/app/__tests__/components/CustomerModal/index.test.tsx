import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Button from '../../../components/shared/Button';
import { CustomerModal as Component } from '../../../components/CustomerModal/CustomerModal';
import mockCustomer from '../../../__testData__/mockCustomer';
import Input from '../../../components/shared/Input';

describe('<CustomerModal />', () => {
  let wrapper: ShallowWrapper;
  const mockFunc = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Component
        onSave={mockFunc}
        onClose={mockFunc}
        selectedCustomerKey={null}
      />
    );
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to update value', () => {
    const inputs = wrapper.find(Input);
    expect(inputs.length).toBe(3);
    inputs.first().prop('onChange')('first-test');
    inputs.at(1).prop('onChange')('last-test');
    inputs.last().prop('onChange')('10/10/1010');
    expect(wrapper.state()).toEqual({
      invalidFields: [],
      value: {
        dateOfBirth: '10/10/1010',
        firstName: 'first-test',
        lastName: 'last-test',
      },
    });
  });

  it('should be able to validate inputs', () => {
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    expect(wrapper.state()).toEqual({
      invalidFields: ['firstName', 'lastName', 'dateOfBirth'],
      value: { dateOfBirth: '', firstName: '', lastName: '' },
    });
  });

  it('should be able to save data if value is valid', () => {
    const value = {
      dateOfBirth: '10/10/1010',
      firstName: 'first-test',
      lastName: 'last-test',
    };
    wrapper.setState({
      value,
    });
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(mockFunc).toHaveBeenCalledWith(value);
  });

  it('should be able to pre-fill input with initialData', () => {
    wrapper = shallow(
      <Component
        onSave={mockFunc}
        onClose={mockFunc}
        selectedCustomerKey={null}
        initialData={mockCustomer}
      />
    );
    const inputs = wrapper.find(Input);
    expect(inputs.first().prop('value')).toBe('first');
    expect(inputs.at(1).prop('value')).toBe('last');
    expect(inputs.last().prop('value')).toBe('10/27/2018');
  });
});
