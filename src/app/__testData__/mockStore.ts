import mockCustomer from './mockCustomer';
import { createStore } from 'redux';

export const storeData = {
  isLoading: false,
  customers: { [mockCustomer.key]: mockCustomer },
};

export default createStore(() => storeData);
