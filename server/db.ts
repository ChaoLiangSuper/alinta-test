/**
 * This file stimulates database, include get and set method.
 */

import { Customer } from '../types';

interface Store {
  [key: string]: Customer;
}

class DB {
  private dataStore: Store = {};

  saveData = (data: Customer) => {
    this.dataStore = {
      ...this.dataStore,
      [data.key]: data,
    };
  };

  getData = () => {
    return { ...this.dataStore };
  };

  deleteData = (key: string) => {
    const newStore = { ...this.dataStore };
    delete newStore.key;
    this.dataStore = newStore;
  };
}

export default new DB();
