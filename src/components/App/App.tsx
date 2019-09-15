import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Section from './Section';
import Button from '../shared/Button';
import Loading from '../Loading';
import CustomerList from '../CustomerList';
import CustomerModel from '../CustomerModal';
import { Customer, Store } from '../../../types';
import { fetchAllCustomers } from '../../store/actions';

interface AppState {
  isModalOpen: boolean;
}

interface AppProps {
  isLoading: boolean;
  dispatch: Dispatch;
}

class App extends React.Component<AppProps, AppState> {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  saveNewCustomer = (newCustomer: Customer) => {
    console.log(newCustomer);
  };

  componentDidMount() {
    this.props.dispatch(fetchAllCustomers());
  }

  render() {
    return this.props.isLoading ? (
      <Loading />
    ) : (
      <div>
        <Section>
          <Button primary onClick={this.toggleModal}>
            Add New Customer
          </Button>
        </Section>
        <Section>
          <CustomerList />
        </Section>
        <CustomerModel
          isOpen={this.state.isModalOpen}
          onSave={this.saveNewCustomer}
          onClose={this.toggleModal}
        />
      </div>
    );
  }
}

export default connect(({ isLoading }: Store) => ({ isLoading }))(App);
