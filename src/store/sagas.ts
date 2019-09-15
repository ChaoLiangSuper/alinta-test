import { put, takeEvery, call, all } from 'redux-saga/effects';
import { FETCH, ADD, DELETE, UPDATE } from './constants';
import * as customersApi from '../api/customers';
import { Action } from '../../types';

export function* fetchAllCustomer() {
  try {
    const { data } = yield call(customersApi.getAllCustomers);
    yield put({ type: FETCH.SUCCESS, customers: data });
  } catch (error) {
    yield put({ type: FETCH.ERROR });
  }
}

export function* addCustomer(action: Action) {
  try {
    const { data } = yield call(customersApi.addCustomer, action.customer!);
    yield put({ type: ADD.SUCCESS, customer: data });
  } catch (error) {
    yield put({ type: ADD.ERROR });
  }
}

export function* updateCustomer(action: Action) {
  try {
    const { data } = yield call(customersApi.updateCustomer, action.customer!);
    yield put({ type: UPDATE.SUCCESS, customer: data });
  } catch (error) {
    yield put({ type: UPDATE.ERROR });
  }
}

export function* deleteCustomer(action: Action) {
  try {
    const { data } = yield call(customersApi.deleteCustomer, action.key!);
    yield put({ type: DELETE.SUCCESS, key: data.key });
  } catch (error) {
    yield put({ type: DELETE.ERROR });
  }
}

export default function* saga() {
  yield all([
    takeEvery(FETCH.REQUEST, fetchAllCustomer),
    takeEvery(ADD.REQUEST, addCustomer),
    takeEvery(UPDATE.REQUEST, updateCustomer),
    takeEvery(DELETE.REQUEST, deleteCustomer),
  ]);
}
