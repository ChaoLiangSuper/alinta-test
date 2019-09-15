import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Button from '../../../components/shared/Button';
import { CustomerList as Component } from '../../../components/CustomerList/CustomerList';
import { storeData } from '../../../__testData__/mockStore';
import Row from '../../../components/CustomerList/Row';
import Input from '../../../components/shared/Input';
import Cell from '../../../components/CustomerList/Cell';

describe('<CustomerList />', () => {
  let wrapper: ShallowWrapper;
  const mockFunc = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Component
        customers={storeData.customers}
        selectCustomer={mockFunc}
        deleteCustomer={mockFunc}
      />
    );
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show empty string', () => {
    wrapper.setProps({
      customers: {},
    });
    expect(
      wrapper
        .find(Row)
        .last()
        .text()
    ).toBe('No Customer Founded');
  });

  it('should be able to select customer', () => {
    wrapper.setProps({
      customers: {
        '123': {
          key: '123',
          firstName: 'first',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
      },
    });
    wrapper
      .find(Button)
      .last()
      .simulate('click');
    expect(mockFunc).toHaveBeenLastCalledWith('123');
  });

  it('should be able to delete customer', () => {
    wrapper.setProps({
      customers: {
        '124': {
          key: '124',
          firstName: 'first',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
      },
    });
    wrapper
      .find(Button)
      .first()
      .simulate('click');
    expect(mockFunc).toHaveBeenLastCalledWith('124');
  });

  it('should be able to search based on first name', done => {
    wrapper.setProps({
      customers: {
        '123': {
          key: '123',
          firstName: 'first1',
          lastName: 'last1',
          dateOfBirth: '10/27/2018',
        },
        '124': {
          key: '124',
          firstName: 'first2',
          lastName: 'last2',
          dateOfBirth: '10/27/2018',
        },
      },
    });
    wrapper.find(Input).prop('onChange')('first1');
    setTimeout(() => {
      expect(wrapper.find(Row).length).toBe(3);
      const lastRow = wrapper.find(Row).last();
      expect(
        lastRow
          .find(Cell)
          .first()
          .text()
      ).toBe('first1');
      done();
    }, 500);
  });

  it('should be able to search based on last name', done => {
    wrapper.setProps({
      customers: {
        '123': {
          key: '123',
          firstName: 'first1',
          lastName: 'last1',
          dateOfBirth: '10/27/2018',
        },
        '124': {
          key: '124',
          firstName: 'first2',
          lastName: 'last2',
          dateOfBirth: '10/27/2018',
        },
      },
    });
    wrapper.find(Input).prop('onChange')('last2');
    setTimeout(() => {
      expect(wrapper.find(Row).length).toBe(3);
      const lastRow = wrapper.find(Row).last();
      expect(
        lastRow
          .find(Cell)
          .first()
          .text()
      ).toBe('first2');
      done();
    }, 500);
  });
});
