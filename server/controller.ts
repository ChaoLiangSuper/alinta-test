import { RequestHandler } from 'express';
import db from './db';
import { Customer } from '../types';

export const getAllCustomers: RequestHandler = (req, res) => {
  res.send(db.getAllData());
};

export const addNewCustomer: RequestHandler = (req, res) => {
  const data = req.body as Customer;
  const newData = db.saveData(data);
  res.send(newData);
};
export const updateCustomer: RequestHandler = (req, res) => {
  const data = req.body as Customer;
  const newData = db.updateData(req.params.key, data);
  res.send(newData);
};
export const deleteCustomer: RequestHandler = (req, res) => {
  db.deleteData(req.params.key);
  res.send({ key: req.params.key });
};
