import _ from 'lodash';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../../types';
import Button from '../shared/Button';
import Row from './Row';
import Cell from './Cell';
import Input from '../shared/Input';

const debounceTime = 300;

interface CustomerListState {
  searchText: string;
}

interface CustomerListProps {
  customers: Store['customers'];
  selectCustomer: (key: string) => void;
  deleteCustomer: (key: string) => void;
  dispatch: Dispatch;
}

class CustomerList extends React.Component<
  CustomerListProps,
  CustomerListState
> {
  state = {
    searchText: '',
  };

  handleChange = _.debounce((text: string) => {
    const searchText = text.trim();
    this.setState({
      searchText,
    });
  }, debounceTime);

  render() {
    const { customers, selectCustomer, deleteCustomer } = this.props;
    const { searchText } = this.state;
    const displayList = _.filter(customers, ({ firstName, lastName }) => {
      return (
        firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        lastName.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    return (
      <>
        <Row>
          <Cell>
            <Input label='Search' onChange={this.handleChange} />
          </Cell>
          <Cell portion={3} />
        </Row>
        <Row>
          <Cell>First Name</Cell>
          <Cell>Last Name</Cell>
          <Cell>Date of Birth</Cell>
          <Cell>Actions</Cell>
        </Row>
        {_.isEmpty(displayList) ? (
          <Row>No Customer Founded</Row>
        ) : (
          _.map(displayList, ({ firstName, lastName, dateOfBirth, key }) => (
            <Row key={key}>
              <Cell>{firstName}</Cell>
              <Cell>{lastName}</Cell>
              <Cell>{dateOfBirth}</Cell>
              <Cell>
                <Button onClick={() => deleteCustomer(key!)}>Delete</Button>
                <Button primary onClick={() => selectCustomer(key!)}>
                  Edit
                </Button>
              </Cell>
            </Row>
          ))
        )}
      </>
    );
  }
}

export default connect(({ customers }: Store) => ({ customers }))(CustomerList);
