import _ from 'lodash';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../../../types';
import Button from '../shared/Button';
import Row from './Row';
import Cell from './Cell';

interface CustomerListProps {
  customers: Store['customers'];
  selectCustomer: (key: string) => void;
  deleteCustomer: (key: string) => void;
  dispatch: Dispatch;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  selectCustomer,
  deleteCustomer,
  dispatch,
}) => {
  return (
    <>
      <Row>
        <Cell>First Name</Cell>
        <Cell>Last Name</Cell>
        <Cell>Date of Birth</Cell>
        <Cell>Actions</Cell>
      </Row>
      {_.isEmpty(customers) ? (
        <Row>No Customer Founded</Row>
      ) : (
        _.map(customers, ({ firstName, lastName, dateOfBirth, key }) => (
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
};

export default connect(({ customers }: Store) => ({ customers }))(CustomerList);
