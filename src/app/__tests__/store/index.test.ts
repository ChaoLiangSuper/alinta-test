import store from '../../store';
import { initState } from '../../store/reducers';

describe('Store', () => {
  it('should be able to initiate redux store', () => {
    expect(store.dispatch).toBeInstanceOf(Function);
    expect(store.getState()).toEqual(initState);
  });
});
