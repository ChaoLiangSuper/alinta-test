/**
 * Global type file.
 */

export interface Customer {
  key?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export interface Field {
  label: string;
  name: 'firstName' | 'lastName' | 'dateOfBirth';
  type?: string;
}

export interface Action {
  type: string;
  customers?: Customer[];
  customer?: Customer;
  key?: Customer['key'];
  data?: any;
}

export interface Store {
  customers: { [key: string]: Customer };
  isLoading: boolean;
}
