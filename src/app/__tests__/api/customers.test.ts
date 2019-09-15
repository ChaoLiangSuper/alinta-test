import {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../api/customers';
import axios from 'axios';
import mockCustomer from '../../__testData__/mockCustomer';

describe('api/customers', () => {
  beforeAll(() => {
    jest.mock('axios');
    axios.get = jest.fn();
    axios.post = jest.fn();
    axios.put = jest.fn();
    axios.delete = jest.fn();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('getAllCustomers()', () => {
    it('should trigger get request to "/customers"', () => {
      getAllCustomers();
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenLastCalledWith('/customers');
    });
  });

  describe('addCustomer()', () => {
    it('should trigger post request to "/customers/add"', () => {
      addCustomer(mockCustomer);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenLastCalledWith(
        '/customers/add',
        mockCustomer
      );
    });
  });

  describe('updateCustomer()', () => {
    it('should trigger post request to "/customers/add"', () => {
      updateCustomer(mockCustomer);
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenLastCalledWith(
        '/customers/111111',
        mockCustomer
      );
    });
  });

  describe('deleteCustomer()', () => {
    it('should trigger post request to "/customers/add"', () => {
      deleteCustomer(mockCustomer.key);
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenLastCalledWith('/customers/111111');
    });
  });
});
