import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Section from './Section';
import Button from '../shared/Button';
import Loading from '../Loading';
import CustomerList from '../CustomerList';
import CustomerModel from '../CustomerModal';
import { Customer, Store } from '../../../types';
import * as actions from '../../store/actions';

interface AppState {
  isModalOpen: boolean;
  selectedCustomerKey: string | null;
}

interface AppProps {
  isLoading: boolean;
  dispatch: Dispatch;
}

export class App extends React.Component<AppProps, AppState> {
  state = {
    isModalOpen: false,
    selectedCustomerKey: null,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  saveCustomer = (customer: Customer) => {
    if (this.state.selectedCustomerKey) {
      this.props.dispatch(actions.updateCustomer(customer));
      return this.setState({
        selectedCustomerKey: null,
      });
    }
    this.props.dispatch(actions.addCustomer(customer));
  };

  selectCustomer = (key: string) => {
    this.setState({
      selectedCustomerKey: key,
      isModalOpen: true,
    });
  };

  deleteCustomer = (key: string) => {
    this.props.dispatch(actions.deleteCustomer(key));
  };

  componentDidMount() {
    this.props.dispatch(actions.fetchAllCustomers());
  }

  render() {
    const { isModalOpen, selectedCustomerKey } = this.state;

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
          <CustomerList
            selectCustomer={this.selectCustomer}
            deleteCustomer={this.deleteCustomer}
          />
        </Section>
        {isModalOpen ? (
          <CustomerModel
            onSave={this.saveCustomer}
            onClose={this.toggleModal}
            selectedCustomerKey={selectedCustomerKey}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(({ isLoading }: Store) => ({ isLoading }))(App);
