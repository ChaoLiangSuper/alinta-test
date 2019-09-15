import { FETCH, ADD, DELETE, UPDATE } from './constants';
import { Customer } from '../../types';

export const fetchAllCustomers = () => ({ type: FETCH.REQUEST });
export const addCustomer = (customer: Customer) => ({
  type: ADD.REQUEST,
  customer,
});
export const deleteCustomer = (key: string) => ({
  type: DELETE.REQUEST,
  key,
});
export const updateCustomer = (customer: Customer) => ({
  type: UPDATE.REQUEST,
  customer,
});
