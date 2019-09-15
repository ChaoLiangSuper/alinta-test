import express from 'express';
import {
  getAllCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
} from './controller';

const router = express.Router();

const path = '/customers';

router.get(path, getAllCustomers);

router.post(`${path}/add`, addNewCustomer);

router.put(`${path}/:key`, updateCustomer);

router.delete(`${path}/:key`, deleteCustomer);

export default router;
