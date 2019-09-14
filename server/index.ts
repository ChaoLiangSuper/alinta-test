import express from 'express';
import bodyParser from 'body-parser';
import { serverPort } from '../config';

const app = express();

app.use(bodyParser.json());

app.listen(serverPort, () => {
  console.log(`Server is running on ${serverPort}`);
});
