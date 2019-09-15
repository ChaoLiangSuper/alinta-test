import express from 'express';
import bodyParser from 'body-parser';
import { serverPort } from '../config';
import router from './router';

export const app = express();

app.use(bodyParser.json());

app.use(router);

app.listen(serverPort, () => {
  console.log(`Server is running on ${serverPort}`);
});
