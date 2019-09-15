import _ from 'lodash';
import request from 'supertest';
import { app } from '../index';

describe('Server', () => {
  it('should be able to handle get customers', async () => {
    const { body } = await request(app).get('/customers');
    expect(body.length).toBe(20);
  });

  it('should be able to add new customer', async () => {
    const { status } = await request(app)
      .post('/customers/add')
      .send({
        firstName: 'test1',
        lastName: 'test2',
        dateOfBirth: '11/11/1111',
      });
    expect(status).toBe(200);

    const { body } = await request(app).get('/customers');
    expect(body.length).toBe(21);
  });

  it('should be able to update existed customer', async () => {
    const id = '0916a14f-093b-43cd-b288-9b591eca8b03';
    const { status } = await request(app)
      .put(`/customers/${id}`)
      .send({
        key: id,
        firstName: 'test1',
        lastName: 'test2',
        dateOfBirth: '11/11/1111',
      });
    expect(status).toBe(200);

    const { body } = await request(app).get('/customers');
    expect(_.find(body, ({ key }) => key === id)).toEqual({
      key: id,
      firstName: 'test1',
      lastName: 'test2',
      dateOfBirth: '11/11/1111',
    });
  });

  it('should be able to delete customer', async () => {
    const id = '0916a14f-093b-43cd-b288-9b591eca8b03';
    const { status } = await request(app).delete(`/customers/${id}`);
    expect(status).toBe(200);

    const { body } = await request(app).get('/customers');
    expect(body.length).toBe(20);
  });
});
