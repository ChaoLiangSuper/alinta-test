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
