import React from 'react';
import { shallow, ShallowWrapper, ReactWrapper, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import App, { App as Component } from '../../../components/App/App';
import Button from '../../../components/shared/Button';
import Loading from '../../../components/Loading';
import CustomerList from '../../../components/CustomerList';
import CustomerModal, {
  CustomerModal as CustomerModalComponent,
} from '../../../components/CustomerModal/CustomerModal';
import theme from '../../../styles/theme';
import Input from '../../../components/shared/Input';
import Row from '../../../components/CustomerList/Row';
import * as customersApi from '../../../api/customers';
import mockCustomer from '../../../__testData__/mockCustomer';
import store from '../../../store';

describe('<App />', () => {
  let wrapper: ShallowWrapper;
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
    wrapper = shallow(<Component isLoading={false} dispatch={dispatch} />);
  });

  it('should render without error', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show loading state', () => {
    wrapper.setProps({
      isLoading: true,
    });
    expect(wrapper.find(Loading).length).toBe(1);
  });

  it('should have new customer button', () => {
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(Button).text()).toBe('Add New Customer');
  });

  it('should render <CustomerList />', () => {
    expect(wrapper.find(CustomerList).length).toBe(1);
  });

  it('should show new customer modal', () => {
    wrapper.find(Button).simulate('click');
    expect(wrapper.find(CustomerModal).length).toBe(1);
  });

  it('should be able to save customer', () => {
    const testCustomer = {
      firstName: 'first-test',
      lastName: 'last-test',
      dateOfBirth: '10/27/2111',
    };
    wrapper
      .find(Button)
      .at(0)
      .simulate('click');
    wrapper.find(CustomerModal).prop('onSave')(testCustomer);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_REQUEST',
      customer: testCustomer,
    });
  });

  it('should be able to select customer', () => {
    const testCustomer = {
      key: '111111',
      firstName: 'first-test',
      lastName: 'last-test',
      dateOfBirth: '10/27/2111',
    };
    wrapper.find(CustomerList).prop('selectCustomer')('111111');
    wrapper.find(CustomerModal).prop('onSave')(testCustomer);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_REQUEST',
      customer: testCustomer,
    });
  });

  it('should be able to delete customer', () => {
    wrapper.find(CustomerList).prop('deleteCustomer')('111111');
    expect(dispatch).toHaveBeenCalledWith({
      type: 'DELETE_REQUEST',
      key: '111111',
    });
  });
});

describe('<App />', () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    const successResponse = {
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    };

    jest
      .spyOn(customersApi, 'getAllCustomers')
      .mockResolvedValue({ ...successResponse, data: [mockCustomer] });
    jest
      .spyOn(customersApi, 'addCustomer')
      .mockImplementation(
        customer =>
          new Promise(resolve =>
            resolve({ ...successResponse, data: { ...customer, key: 'new' } })
          )
      );
    jest
      .spyOn(customersApi, 'updateCustomer')
      .mockImplementation(
        customer =>
          new Promise(resolve =>
            resolve({ ...successResponse, data: customer })
          )
      );
    jest
      .spyOn(customersApi, 'deleteCustomer')
      .mockImplementation(
        key =>
          new Promise(resolve => resolve({ ...successResponse, data: { key } }))
      );
  });

  beforeEach(() => {
    wrapper = mount(
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </StoreProvider>
    );
  });

  it('should mount without error', () => {
    wrapper.update();
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to add new customer', async () => {
    wrapper.update();
    expect(wrapper.find(Row).length).toBe(3);

    wrapper
      .find(Button)
      .first()
      .simulate('click');

    wrapper.find(CustomerModal).prop('onSave')({
      firstName: 'first-name-test',
      lastName: 'last-name-test',
      dateOfBirth: '10/27/2018',
    });

    await setTimeout(() => new Promise(resolve => resolve()), 0);
    wrapper.update();
    expect(wrapper.find(Row).length).toBe(4);
  });

  it('should be able to select customer', async () => {
    wrapper.update();
    const rows = wrapper.find(Row);
    expect(rows.length).toBe(3);

    rows
      .last()
      .find(Button)
      .last()
      .simulate('click');

    await setTimeout(() => new Promise(resolve => resolve()), 0);
    wrapper.update();
    const modal = wrapper.find(CustomerModal);
    expect(modal.length).toBe(1);
    expect(
      modal
        .find(Input)
        .first()
        .prop('value')
    ).toBe('first');
    expect(
      modal
        .find(Input)
        .at(1)
        .prop('value')
    ).toBe('last');
    expect(
      modal
        .find(Input)
        .last()
        .prop('value')
    ).toBe('10/27/2018');
  });

  it('should be able to handle invalid input', async () => {
    wrapper.update();
    wrapper
      .find(Button)
      .first()
      .simulate('click');

    wrapper
      .find(CustomerModalComponent)
      .find(Button)
      .last()
      .simulate('click');

    expect(
      wrapper
        .find(CustomerModalComponent)
        .find(Input)
        .first()
        .prop('invalid')
    ).toBe(true);
    expect(
      wrapper
        .find(CustomerModalComponent)
        .find(Input)
        .at(1)
        .prop('invalid')
    ).toBe(true);
    expect(
      wrapper
        .find(CustomerModalComponent)
        .find(Input)
        .last()
        .prop('invalid')
    ).toBe(true);
  });
});
