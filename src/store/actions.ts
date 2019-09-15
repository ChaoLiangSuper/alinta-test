import { FETCH, ADD, DELETE, UPDATE } from './constants';
import { Customer, Action } from '../../types';

export const fetchAllCustomers = (): Action => ({ type: FETCH.REQUEST });
export const addCustomer = (customer: Customer): Action => ({
  type: ADD.REQUEST,
  customer,
});
export const deleteCustomer = (key: string): Action => ({
  type: DELETE.REQUEST,
  key,
});
export const updateCustomer = (customer: Customer): Action => ({
  type: UPDATE.REQUEST,
  customer,
});
