const generateActions = (action: string) => ({
  REQUEST: `${action}_REQUEST`,
  SUCCESS: `${action}_SUCCESS`,
  ERROR: `${action}_ERROR`,
});

export const FETCH = generateActions('FETCH');
export const ADD = generateActions('ADD');
export const DELETE = generateActions('DELETE');
export const UPDATE = generateActions('UPDATE');
