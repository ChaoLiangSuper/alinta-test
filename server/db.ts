/**
 * This file stimulates database, include get and set method.
 */

import _ from 'lodash';
import uuid from 'uuid/v1';
import { Customer } from '../types';

interface Store {
  [key: string]: Customer;
}

class DB {
  private dataStore: Store = {};

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
