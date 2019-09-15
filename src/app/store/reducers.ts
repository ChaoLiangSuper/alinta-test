import _ from 'lodash';
import { Action, Store } from '../../types';
import { FETCH, ADD, DELETE, UPDATE } from './constants';

export const initState: Store = {
  isLoading: true,
  customers: {},
};

const reducers = (state = initState, action: Action) => {
  switch (action.type) {
    case FETCH.SUCCESS:
      return {
        isLoading: false,
        customers: _.keyBy(action.customers, 'key'),
      };
    case ADD.SUCCESS:
    case UPDATE.SUCCESS:
      return {
        ...state,
        customers: {
          ...state.customers,
          [action.customer!.key!]: action.customer!,
        },
      };
    case DELETE.SUCCESS: {
      const customers = { ...state.customers };
      delete customers[action.key!];
      return {
        ...state,
        customers,
      };
    }
    case FETCH.ERROR:
    case ADD.ERROR:
    case DELETE.ERROR:
    case UPDATE.ERROR:
      console.log('Some errors happen with the API call, please check.');
      return state;
    default:
      return state;
  }
};

export default reducers;
