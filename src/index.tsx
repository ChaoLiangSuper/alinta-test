import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import App from './app/components/App';
import theme from './app/styles/theme';
import store from './app/store';

ReactDOM.render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
);
