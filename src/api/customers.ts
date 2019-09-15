import axios from 'axios';
import { Customer } from '../../types';

const path = '/customers';

export const getAllCustomers = () => axios.get(path);

export const addCustomer = (customer: Customer) =>
  axios.post(`${path}/add`, customer);

export const updateCustomer = (customer: Customer) =>
  axios.put(`${path}/${customer.key}`, customer);

export const deleteCustomer = (key: string) => axios.delete(`${path}/${key}`);
