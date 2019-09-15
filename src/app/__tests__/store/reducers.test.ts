import reducers, { initState } from '../../store/reducers';
import { FETCH, ADD, DELETE, UPDATE } from '../../store/constants';
import mockCustomer from '../../__testData__/mockCustomer';

describe('Reducers', () => {
  let state = initState;

  it('should be able to handle FETCH', () => {
    state = reducers(state, {
      type: FETCH.SUCCESS,
      customers: [mockCustomer],
    });

    expect(state).toEqual({
      isLoading: false,
      customers: {
        '111111': {
          key: '111111',
          firstName: 'first',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
      },
    });
  });

  it('should be able to handle ADD and UPDATE', () => {
    state = reducers(state, {
      type: ADD.SUCCESS,
      customer: { ...mockCustomer, key: '123' },
    });

    expect(state).toEqual({
      isLoading: false,
      customers: {
        '111111': {
          key: '111111',
          firstName: 'first',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
        '123': {
          key: '123',
          firstName: 'first',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
      },
    });

    state = reducers(state, {
      type: UPDATE.SUCCESS,
      customer: { ...mockCustomer, firstName: 'first-test' },
    });

    expect(state).toEqual({
      isLoading: false,
      customers: {
        '111111': {
          key: '111111',
          firstName: 'first-test',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
        '123': {
          key: '123',
          firstName: 'first',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
      },
    });
  });

  it('should be able to handle DELETE', () => {
    state = reducers(state, {
      type: DELETE.SUCCESS,
      key: '123',
    });

    expect(state).toEqual({
      isLoading: false,
      customers: {
        '111111': {
          key: '111111',
          firstName: 'first-test',
          lastName: 'last',
          dateOfBirth: '10/27/2018',
        },
      },
    });
  });

  it('should be able to handle error', () => {
    console.log = jest.fn();
    state = reducers(state, {
      type: FETCH.ERROR,
    });

    expect(console.log).toHaveBeenLastCalledWith(
      'Some errors happen with the API call, please check.'
    );
  });
});
