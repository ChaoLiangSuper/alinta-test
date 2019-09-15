import { runSaga } from 'redux-saga';
import {
  fetchAllCustomer,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../store/sagas';
import { FETCH, ADD, DELETE, UPDATE } from '../../store/constants';
import * as customersApi from '../../api/customers';

const successResponse = {
  status: 200,
  statusText: '',
  headers: {},
  config: {},
};

const errorResponse = {
  status: 400,
  statusText: '',
  headers: {},
  config: {},
};

describe('Redux Saga', () => {
  describe('fetchAllCustomer()', () => {
    it('should call api to get all customers', async () => {
      const actions = [];
      jest
        .spyOn(customersApi, 'getAllCustomers')
        .mockResolvedValueOnce({ ...successResponse, data: 'test' });

      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        fetchAllCustomer
      );
      expect(actions).toEqual([{ type: FETCH.SUCCESS, customers: 'test' }]);

      jest
        .spyOn(customersApi, 'getAllCustomers')
        .mockRejectedValueOnce(errorResponse);
      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        fetchAllCustomer
      );
      expect(actions).toEqual([
        { type: FETCH.SUCCESS, customers: 'test' },
        { type: FETCH.ERROR },
      ]);
    });
  });

  describe('addCustomer()', () => {
    it('should call api to add customer', async () => {
      const actions = [];
      jest
        .spyOn(customersApi, 'addCustomer')
        .mockResolvedValueOnce({ ...successResponse, data: 'test' });

      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        addCustomer,
        { type: ADD.REQUEST }
      );
      expect(actions).toEqual([{ type: ADD.SUCCESS, customer: 'test' }]);

      jest
        .spyOn(customersApi, 'addCustomer')
        .mockRejectedValueOnce(errorResponse);
      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        addCustomer,
        { type: ADD.REQUEST }
      );
      expect(actions).toEqual([
        { type: ADD.SUCCESS, customer: 'test' },
        { type: ADD.ERROR },
      ]);
    });
  });

  describe('updateCustomer()', () => {
    it('should call api to update customer', async () => {
      const actions = [];
      jest
        .spyOn(customersApi, 'updateCustomer')
        .mockResolvedValueOnce({ ...successResponse, data: 'test' });

      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        updateCustomer,
        { type: UPDATE.REQUEST }
      );
      expect(actions).toEqual([{ type: UPDATE.SUCCESS, customer: 'test' }]);

      jest
        .spyOn(customersApi, 'updateCustomer')
        .mockRejectedValueOnce(errorResponse);
      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        updateCustomer,
        { type: UPDATE.REQUEST }
      );
      expect(actions).toEqual([
        { type: UPDATE.SUCCESS, customer: 'test' },
        { type: UPDATE.ERROR },
      ]);
    });
  });

  describe('deleteCustomer()', () => {
    it('should call api to delete customer', async () => {
      const actions = [];
      jest
        .spyOn(customersApi, 'deleteCustomer')
        .mockResolvedValueOnce({ ...successResponse, data: { key: 'test' } });

      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        deleteCustomer,
        { type: DELETE.REQUEST }
      );
      expect(actions).toEqual([{ type: DELETE.SUCCESS, key: 'test' }]);

      jest
        .spyOn(customersApi, 'deleteCustomer')
        .mockRejectedValueOnce(errorResponse);
      await runSaga(
        {
          dispatch: action => actions.push(action),
        },
        deleteCustomer,
        { type: DELETE.REQUEST }
      );
      expect(actions).toEqual([
        { type: DELETE.SUCCESS, key: 'test' },
        { type: DELETE.ERROR },
      ]);
    });
  });
});
