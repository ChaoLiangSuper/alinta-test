/**
 * This file stimulates database, include get and set method.
 */

import _ from 'lodash';
import uuid from 'uuid/v1';
import { Customer } from '../types';
import example_data from './data.json';

interface Store {
  [key: string]: Customer;
}

class DB {
  private dataStore: Store = _.keyBy(example_data, 'key');

  saveData = (data: Customer) => {
    const key = uuid();
    this.dataStore = {
      ...this.dataStore,
      [key]: {
        ...data,
        key: key,
      },
    };

    return this.getOneData(key);
  };

  updateData = (key: string, data: Customer) => {
    this.dataStore = {
      ...this.dataStore,
      [key]: data,
    };

    return this.getOneData(key);
  };

  getAllData = () => {
    return _.map(this.dataStore, data => data);
  };

  getOneData = (key: string) => {
    return this.dataStore[key];
  };

  deleteData = (key: string) => {
    const newDataStore = { ...this.dataStore };
    delete newDataStore[key];
    this.dataStore = newDataStore;
  };
}

export default new DB();
