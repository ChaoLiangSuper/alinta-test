import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CustomerList from './CustomerList';
import NewCustomerModel from './NewCustomerModel';
import { Customer } from '../../types';

const Section = styled.div`
  background: lightgray;
  padding: ${({ theme }) => theme.spacing(3)};

  & + & {
    margin-top: 20px;
  }
`;

interface AppState {
  isModalOpen: boolean;
}

class App extends React.Component<{}, AppState> {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  saveNewCustomer = (newCustomer: Customer) => {
    console.log(newCustomer);
  };

  render() {
    return (
      <div>
        <Section>
          <Button primary onClick={this.openModal}>
            Add New Customer
          </Button>
        </Section>
        <Section>
          <CustomerList />
        </Section>
        <NewCustomerModel
          isOpen={this.state.isModalOpen}
          onSave={this.saveNewCustomer}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}

export default App;
