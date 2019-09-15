import { darken } from 'polished';

const blue = '#3c70a4';
const grey = '#e5e5e5';
const lightGrey = '#eeeeee';

export default {
  primaryColor: blue,
  primaryColorDark: darken(0.2, blue),
  primaryText: 'white',
  secondaryColor: grey,
  secondaryColorDark: darken(0.2, grey),
  secondaryText: blue,
  spacing: (num = 1) => `${8 * num}px`,
  borderRadius: (num = 1) => `${4 * num}px`,
  background: lightGrey,
};
